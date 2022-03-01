const saleValidSchema = require('../schemas/saleValidSchema');

const validateSale = (req, res, next) => {
  const { error } = saleValidSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  return next();
};

module.exports = validateSale;