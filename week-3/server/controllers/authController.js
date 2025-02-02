const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const { promisify } = require("util");

const User = require("../models/userModel");

const catchAsync = require("../Utils/catchAsync");

const AppError = require("../Utils/appError");

// const sendEmail = require('../Utils/email');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  sameSite: "None",
};

const createSendToken = async (user, statuscode, res) => {
  const token = signToken(user.id);
  if (process.env.NODE_ENV === "production") cookieOptions.secure = false;
  // res.cookie('jwt', token, cookieOptions);

  // remove password field
  user.password = undefined;

  const query = User.findById(user.id);
  const doc = await query;
  // console.log(token);
  res.status(statuscode).json({
    status: "success",
    token,
    data: {
      token,
      doc,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body)
  console.log("im in here ")
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    rollNo: req.body.rollNo,
    batch: req.body.batch,
    hostname: req.body.hostname,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const url = process.env.FROND_URL;
  console.log(url);

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body)

  const { email, password } = req.body;
  //check if email and password exists

  if (!email || !password) {
    next(new AppError("please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("password");

  const correct = await user.passwordCorrect(password, user.password);

  if (!user || !correct) {
    return next(new AppError("Incorrect Email or Password", "401"));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Geting token and checking if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }

  if (!token) {
    return next(new AppError("You are not logged in! please log in", 401));
  }
  // 2)Verification of token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3)check if user still exists

  const freshUser = await User.findById(decode.id);

  if (!freshUser)
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  // 4)check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError(
        "User recentely have changed the password! Please login again",
        401
      )
    );
  }

  //GRANT ACCESS TO THE PROTECTED ROUTE
  req.user = freshUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on POSTed e-mail

  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("There is no user with this email", 404));

  // 2) generate random reset token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  const resetURL = `${process.env.FROND_URL}/resetPassword/${resetToken}`;

  // const message = `Forgot Password ? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}. \n if you did not forget the password them please ignore this email`;
  // await new Email(newUser, url).sendWelcome();

  try {
    await new Email(user, resetURL).sendReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("there was error sending email Try again later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if token has not expired, and there is user, set new password

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3) update changed password At property for the user

  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) check if POSTed current password is correct
  if (!(await user.passwordCorrect(req.body.passwordCurrent, user.password)))
    return next(
      new AppError("your current password is incorrect, Please try again!", 401)
    );
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
