import prisma from '../models/prismaClient';
import jwtGenerator from '../helpers/jwtGenerator';
import IUser from '../interfaces/usuario';

class UsersService {
  addUser = async (user: IUser) => {
    const result = await prisma.user.create({
      data: user,
    });
    const { id, username } = result;
    const token = jwtGenerator({ id, username });

    return { code: 201, token };
  };
}

export default new UsersService();