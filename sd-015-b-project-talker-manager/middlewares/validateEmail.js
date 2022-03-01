function validateEmail(req, res, next) {
  try {
    const { email } = req.body;
    // refererencia de validação de email:
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validEmail = /\S+@\S+\.\S+/;

    if (!email || email === '') {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!validEmail.test(email)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = validateEmail;