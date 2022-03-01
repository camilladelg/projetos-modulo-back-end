const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const middlewaresValidate = [
  middlewares.validateToken,
  middlewares.validateName,
  middlewares.validateAge,
  middlewares.validadeTalk,
  middlewares.validatewatchedAt,
  middlewares.validateRate,
];

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', controllers.listSpeakers);

app.get(
  '/talker/search',
  middlewares.validateToken,
  controllers.searchSpeaker,
);

app.get('/talker/:id', controllers.speakerById);

app.post(
  '/login',
  middlewares.validateEmail,
  middlewares.validatePassword,
  controllers.login,
);

app.post(
  '/talker',
  middlewaresValidate,
  controllers.createSpeaker,
);

app.put(
  '/talker/:id',
  middlewaresValidate,
  controllers.updateSpeaker,
);

app.delete(
  '/talker/:id',
  middlewares.validateToken,
  controllers.deleteSpeaker,
  );

app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log('Online');
});
