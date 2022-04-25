const express = require('express');
const loginMiddleware = require('../middlewares/loginMiddleware');
const { login } = require('../controllers/loginController');

const router = express.Router();

router.post('/', loginMiddleware, login);

module.exports = router;