const express = require('express');

const userRouter = require('./src/routers/user.Routes');
const loginRouter = require('./src/routers/login.routes');
const categoryRouter = require('./src/routers/category.routes');
const blogPostRouter = require('./src/routers/blogPost.routes');

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);
app.use('/post', blogPostRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
