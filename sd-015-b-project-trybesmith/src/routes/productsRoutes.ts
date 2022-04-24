import { Router } from 'express';
import ProductsController from '../controllers/productsController';
import productsMiddleware from '../middlewares/productsMiddleware';

const routes = Router();

routes.get('/', ProductsController.findProducts);
routes.post('/', productsMiddleware, ProductsController.addProducts);

export default routes;