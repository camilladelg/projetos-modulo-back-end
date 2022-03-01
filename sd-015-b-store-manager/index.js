const express = require('express');
require('dotenv').config();

const errorMiddleware = require('./middlewares/errorHandler');
const productsRouter = require('./routes/productsRoutes');
const salesRouter = require('./routes/salesRoutes');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
