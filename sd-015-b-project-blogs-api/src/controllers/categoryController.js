const categoryService = require('../services/categoryService');

const categoryCreate = async (req, res, _next) => {
  const { name } = req.body;

  const { code, message, category } = await categoryService.categoryCreate(name);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(category);
};

const getCategories = async (req, res, _next) => {
  const { code, categories } = await categoryService.getCategories();

  return res.status(code).json(categories);
};

module.exports = {
  categoryCreate,
  getCategories,
};