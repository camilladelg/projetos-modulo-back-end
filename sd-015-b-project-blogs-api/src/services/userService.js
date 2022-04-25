const { User } = require('../models');
const jwtGenerator = require('../helpers/jwtGenerator');

const userCreate = async (user) => {
  const { displayName, email, password, image } = user;

  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    return { code: 409, message: 'User already registered' };
  }

  const newUser = await User.create({ displayName, email, password, image });

  const token = jwtGenerator({ id: newUser.id, displayName, email });

  return { code: 201, token };
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  // console.log(users);

  return { code: 200, users };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });

  if (!user) {
    return { code: 404, message: 'User does not exist' };
  }

  return { code: 200, user };
};

const deleteUser = async (id) => {
  try {
    await User.destroy({ where: { id } });

    return { code: 204 };
  } catch (e) {
    console.log(e.message);

    return { code: 500, message: e.message };
  }
};

module.exports = {
  userCreate,
  getUsers,
  getUserById,
  deleteUser,
};