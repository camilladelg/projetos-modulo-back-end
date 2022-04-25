const express = require('express');
const { categoryCreate, getCategories } = require('../controllers/categoryController');
const categoryMiddleware = require('../middlewares/categoryMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const router = express.Router();

router.post('/', categoryMiddleware, tokenMiddleware, categoryCreate);
router.get('/', tokenMiddleware, getCategories);

module.exports = router;