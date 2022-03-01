const listProductsModel = require('../models/listProductsModel');
// const listProductsService = require('../services/listProductsService');

const listProducts = async (_req, res, _next) => {
  // try {
  const products = await listProductsModel.listProducts();
  return res.status(200).json(products);
  // } catch (e) {
  //   return next(e);
  // }
};

const listProductsById = async (req, res, _next) => {
  // try {
  const { id } = req.params;

  const [product] = await listProductsModel.listProductsById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
  // } catch (e) {
  //   return next(e);
  // }
};

const addProducts = async (req, res) => {
  const { name, quantity } = req.body;

  const products = await listProductsModel.listProducts();

  const existingName = products.find((p) => p.name === name);

  if (existingName) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  
  const product = await listProductsModel.addProducts(name, quantity);
  return res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await listProductsModel.updateProduct(id, name, quantity);
  if (product.affectedRows === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await listProductsModel.deleteProduct(id);
  // console.log(test);

  if (product.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });

  return res.status(204).end();
};

module.exports = {
  listProducts,
  listProductsById,
  addProducts,
  updateProduct,
  deleteProduct,
};