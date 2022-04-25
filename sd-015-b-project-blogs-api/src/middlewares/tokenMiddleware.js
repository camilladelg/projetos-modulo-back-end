const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.tokenData = decode.data;

    next();
  } catch (error) {
    // console.log(error);
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next(error);
  }
};

// referencia: Monitoria Gabriel Gaspar;