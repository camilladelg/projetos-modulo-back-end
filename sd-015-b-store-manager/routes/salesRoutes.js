const express = require('express');
const listSalesContoller = require('../controllers/listSalesController');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', listSalesContoller.listSales);
router.get('/:id', listSalesContoller.listSalesById);
router.post('/', validateSale, listSalesContoller.addSales);
router.put('/:id', validateSale, listSalesContoller.updateSales);

module.exports = router;