function validatewatchedAt(req, res, next) {
  try {
    const { talk } = req.body;
    const validDate = /^([012][1-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9][0-9][0-9])$/;

    if (!talk.watchedAt) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }

    if (!validDate.test(talk.watchedAt)) {
      res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    
    return next();
  } catch (e) { 
    return next(e);
  }
}

module.exports = validatewatchedAt;

// ref regex:
// https://regexland.com/regex-dates/#:~:text=A%20regular%20expression%20for%20dates,day%20between%2001%20and%2031.