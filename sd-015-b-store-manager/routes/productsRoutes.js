const express = require('express');
const listProductsControllers = require('../controllers/listProductsController');
const validateProduct = require('../middlewares/validateProdt');

const router = express.Router();

router.get(
  '/',
  listProductsControllers.listProducts,
);

router.get(
  '/:id',
  listProductsControllers.listProductsById,
);

router.post('/', validateProduct, listProductsControllers.addProducts);

router.put('/:id', validateProduct, listProductsControllers.updateProduct);

router.delete('/:id', listProductsControllers.deleteProduct);

module.exports = router;