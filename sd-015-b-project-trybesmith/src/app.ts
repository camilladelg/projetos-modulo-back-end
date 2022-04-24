import express from 'express';
import routes from './routes/productsRoutes';
import usersRoutes from './routes/usersRoutes';
import ordersRouter from './routes/ordersRouter';

const app = express();

app.use(express.json());

app.use('/products', routes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRouter);

export default app;
