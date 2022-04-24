import prisma from '../models/prismaClient';

class ProductsService {
  findProducts = async () => {
    const result = await prisma.product.findMany();
    return { code: 200, result };
  };

  addProducts = async (name: string, amount: string) => {
    const item = await prisma.product.create({
      data: { name, amount },
    });
    // console.log(item);

    return { code: 201, item };
  };
}

export default new ProductsService();