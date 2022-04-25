const loginService = require('../services/loginService');

const login = async (req, res, _next) => {
  try {
    const { code, message, token } = await loginService.login(req.body);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  login,
};