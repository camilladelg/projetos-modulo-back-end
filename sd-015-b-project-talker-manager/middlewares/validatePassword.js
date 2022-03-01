function validatePassword(req, res, next) {
  try {
    const { password } = req.body;
    // refererencia de validação de email:
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const SIX = 6;

    if (!password || password === '') {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < SIX) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = validatePassword;