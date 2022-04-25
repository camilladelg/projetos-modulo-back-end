const blogPostPutSchema = require('../schemas/blogPostPutSchema');

module.exports = (req, res, next) => {
  const { error } = blogPostPutSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }

  return next();
};