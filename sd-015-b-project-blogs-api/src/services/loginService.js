const { User } = require('../models');
const jwtGenerator = require('../helpers/jwtGenerator');

const login = async (user) => {
  const { email, password } = user;

  const userExist = await User.findOne({ where: { email } });

  if (!userExist || userExist.password !== password) {
    return { code: 400, message: 'Invalid fields' };
  }

  const token = jwtGenerator({ id: userExist.id, displayName: userExist.displayName, email });

  return { code: 200, token };
};

module.exports = {
  login,
};