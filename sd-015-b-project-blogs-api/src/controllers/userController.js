const userService = require('../services/userService');

const userCreate = async (req, res, _next) => {
  try {
    const { code, message, token } = await userService.userCreate(req.body);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

const getUsers = async (req, res, _next) => {
  try {
    const { code, users } = await userService.getUsers({ attributes: { exclude: 'password' } });

    return res.status(code).json(users);
  } catch (e) {
    // console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

const getUserById = async (req, res, _next) => {
  const { id } = req.params;

  const { code, message, user } = await userService
  .getUserById(id, { attributes: { exclude: 'password' } });

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(user);
};

const deleteUser = async (req, res, _next) => {
  const { id } = req.tokenData;

  const { code, message } = await userService.deleteUser(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).end();
};

module.exports = {
  userCreate,
  getUsers,
  getUserById,
  deleteUser,
};