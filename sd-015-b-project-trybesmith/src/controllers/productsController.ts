import { Request, Response } from 'express';
import productsService from '../services/productsService';

class ProductsController {
  findProducts = async (_req: Request, res: Response) => {
    const { code, result } = await productsService.findProducts();

    res.status(code).json(result);
  };

  addProducts = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const { code, item } = await productsService.addProducts(name, amount);

    return res.status(code).json({ item });
  };
}

export default new ProductsController();