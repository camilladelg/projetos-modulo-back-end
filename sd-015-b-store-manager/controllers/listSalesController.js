const listSalesModel = require('../models/listSalesModel');
const listSalesService = require('../services/listSalesService');

const listSales = async (_req, res, _next) => {
  // try {
  const sales = await listSalesModel.listSales();
  return res.status(200).json(sales);
  // } catch (e) {
  //   return next(e);
  // }
};

const listSalesById = async (req, res, _next) => {
  // try {
  const { id } = req.params;

  const SalesById = await listSalesModel.listSalesById(id);

  if (SalesById.length <= 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(SalesById);
  // } catch (e) {
  //   return next(e);
  // }
};

const addSales = async (req, res) => {
  const sales = await listSalesService.addSales(req.body);

  return res.status(201).json(sales);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const productsSale = req.body;

  const saleObj = { id, productsSale };
  const updatedSale = await listSalesService.updateSales(saleObj);

  return res.status(200).json(updatedSale);
};

module.exports = {
  listSales,
  listSalesById,
  addSales,
  updateSales,
};