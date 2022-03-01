const errorHandler = require('./errorHandler');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validadeTalk = require('./validateTalk');
const validatewatchedAt = require('./validateWatchedAt');
const validateRate = require('./validateRate');

module.exports = {
  errorHandler,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validadeTalk,
  validatewatchedAt,
  validateRate,
};