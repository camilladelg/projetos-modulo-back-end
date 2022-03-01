const connection = require('./connection');

const listSales = async () => {
  const query = `SELECT
  sp.sale_id AS saleId,
  sp.product_id AS productId,
  sp.quantity,
  s.date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id; `;

  const [result] = await connection.execute(query);

  return result;
};

const listSalesById = async (id) => {
  const query = `SELECT
  sp.product_id AS productId,
  sp.quantity,
  s.date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE sp.sale_id=?; `;

  const [result] = await connection.execute(query, [id]);

  return result;
};

const addSales = async () => {
  const query = 'INSERT INTO StoreManager.sales () VALUES ();';
  const [result] = await connection.execute(query);
  // console.log(result);
  return result.insertId;
};

const addSalesProducts = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`;

  const [result] = await connection.execute(query, [saleId, productId, quantity]);
  return result;
};

const updateSales = async (quantity, saleId, productId) => {
  const query = `
  UPDATE StoreManager.sales_products SET quantity=? WHERE sale_id=? AND product_id=?;`;
  const [result] = await connection.execute(query, [quantity, saleId, productId]);
  // console.log(result);
  return result;
};

module.exports = {
  listSales,
  listSalesById,
  addSales,
  addSalesProducts,
  updateSales,
};