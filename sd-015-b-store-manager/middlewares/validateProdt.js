const productValidSchema = require('../schemas/productValidSchema');

const validateProduct = (req, res, next) => {
  const { error } = productValidSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  return next();
};

module.exports = validateProduct;