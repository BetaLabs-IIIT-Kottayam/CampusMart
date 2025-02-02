const express = require('express');

const router = express.Router();

// const userRoutes = require('../Controllers/userControllers');
const authControllers = require('../controllers/authController');

  
router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.post('/forgotPassword', authControllers.forgotPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);

// protect everything after this

// router.use(authControllers.protect);

// router.patch('/updateMyPassword', authControllers.updatePassword);
// router.patch('/updateMe', userRoutes.updateMe);
// router.delete('/deleteMe', userRoutes.deleteMe);
// router.get('/me', userRoutes.getMe, userRoutes.getUser);

// router.use(authControllers.restrictTo('admin'));

// router.route('/').get(userRoutes.getAllUsers).post(userRoutes.createUser);

// router
//   .route('/:id')
//   .get(userRoutes.getUser)
//   .patch(userRoutes.updateUser)
//   .delete(userRoutes.deleteUser);

module.exports = router;
