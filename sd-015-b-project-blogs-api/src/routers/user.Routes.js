const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const {
  userCreate,
  getUsers,
  getUserById,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', userMiddleware, userCreate);
router.get('/', tokenMiddleware, getUsers);
router.get('/:id', tokenMiddleware, getUserById);
router.delete('/me', tokenMiddleware, deleteUser);

module.exports = router;