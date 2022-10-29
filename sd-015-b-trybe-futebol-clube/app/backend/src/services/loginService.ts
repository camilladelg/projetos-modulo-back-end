import bcryptjs from 'bcryptjs';
import User from '../database/models/User';
import jwtGenerator from '../helpers/jwtGenerator';

class LoginService {
  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { code: 401, message: 'User not found' };
    }
    if (!(await bcryptjs.compare(password, user.password))) {
      return { code: 400, message: 'Incorrect email or password' };
    }
    const { id, username, role } = user;
    const token = jwtGenerator({ id, username, role, email });

    return { code: 200, user: { id, username, role, email }, token };
  };
}

export default new LoginService();
