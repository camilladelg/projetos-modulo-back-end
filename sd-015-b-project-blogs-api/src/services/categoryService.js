const { Category } = require('../models');

const categoryCreate = async (name) => {
  const categoryExist = await Category.findOne({ where: { name } });

  if (categoryExist) {
    return { code: 409, message: 'Category already registered' };
  }

  const category = await Category.create({ name });

  return { code: 201, category };
};

const getCategories = async () => {
  const categories = await Category.findAll();

  return { code: 200, categories };
};

module.exports = {
  categoryCreate,
  getCategories,
};