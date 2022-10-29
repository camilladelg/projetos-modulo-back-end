// import CustomRouter from './routes/Router';
import App from './app';

import CarController from './controllers/CarController';

import { Car } from './interfaces/CarInterface';

import CustomRouter from './routes/Router';

const server = new App();

const carController = new CarController();

const customRouter = new CustomRouter<Car>();
customRouter.addRouter(carController);

server.addRouter(customRouter.router);

export default server;
