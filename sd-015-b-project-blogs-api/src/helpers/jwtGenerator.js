const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;

module.exports = (data = {}) => jwt.sign({ data }, secret, jwtConfig);