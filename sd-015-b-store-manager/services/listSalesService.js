const listSalesModel = require('../models/listSalesModel');

// const listSales = async () => listSalesModel.listSales();

// const listSalesById = async (id) => listSalesModel.listSalesById(id);

const addSales = async (productsSales) => {
    const insertId = await listSalesModel.addSales();
    // console.log(insertId);

    await productsSales.forEach((p) => ( 
      listSalesModel.addSalesProducts(insertId, p.productId, p.quantity)));

    const result = { id: insertId, itemsSold: productsSales };
    
    return result;
};

const updateSales = async ({ id: saleId, productsSale }) => {
  await productsSale.forEach((p) => (
    listSalesModel.updateSales(p.quantity, saleId, p.productId)
  ));

  const result = { saleId, itemUpdated: productsSale };
  // console.log(result);

  return result;
};

module.exports = {
  // listSales,
  // listSalesById,
  addSales,
  updateSales,
};