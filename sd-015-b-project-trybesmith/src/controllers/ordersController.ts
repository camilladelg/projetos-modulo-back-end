import { Request, Response } from 'express';
import OrderService from '../services/ordersService';

class OrdersController {
  findOrders = async (_req: Request, res: Response) => {
    const { code, orders } = await OrderService.findOrders();

    return res.status(code).json(orders);
  };
}

export default new OrdersController();