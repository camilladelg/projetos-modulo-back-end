import prisma from '../models/prismaClient';

class OrderService {
  findOrders = async () => {
    const result = await prisma.order.findMany({
      include: {
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    const orders = result.map((data) => ({
      ...data, products: data.products.map(({ id }) => id),
    }));
    return { code: 200, orders };
  };
}

export default new OrderService();