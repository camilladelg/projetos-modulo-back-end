const blogPostSchema = require('../schemas/blogPostSchema');

module.exports = (req, res, next) => {
  const { error } = blogPostSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }

  return next();
};