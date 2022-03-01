const crypto = require('crypto');

function login(_req, res) {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  }

module.exports = login;
