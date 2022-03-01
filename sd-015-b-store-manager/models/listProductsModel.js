const connection = require('./connection');

const listProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [result] = await connection.execute(query);
  return result;
};

const listProductsById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  
  const [result] = await connection.execute(query, [id]);

  return result;
};

const addProducts = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products(name, quantity) VALUES(?, ?);';
  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const updateProduct = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?;';
  const [result] = await connection.execute(query, [name, quantity, id]);
  return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

module.exports = {
  listProducts,
  listProductsById,
  addProducts,
  updateProduct,
  deleteProduct,
};