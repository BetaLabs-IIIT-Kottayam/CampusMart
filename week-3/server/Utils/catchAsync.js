module.exports = (fn) => (req, res, next) => {
  console.log('yes iam there');
  fn(req, res, next).catch(next);
};
  