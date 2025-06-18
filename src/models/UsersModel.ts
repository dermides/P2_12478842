import { Op } from 'sequelize';
import Users from './Users';
import bcrypt from "bcrypt";

class UsersModel {
  
  async findByUser(username: string) {
    return await Users.findOne({ where: { username: { [Op.like]: `%${username}%` } } });
  }

  async register(username: string, password_hash: string) {
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    return await Users.create({ username, password_hash: hashedPassword});
  }
  
  /*async register(req: Request, res: Response) {
    const { username, password_hash } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await Users.create({ username, password: hashedPassword });
      res.status(201).json({ message: "Usuario registrado", user: newUser });
    } catch (error) {
      res.status(400).json({ error: "Error al registrar usuario" });
    }
  }*/

  async login(req: any, res: any) {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    req.session.userId = user.id;
    return res.json({ message: "Inicio de sesión exitoso" });
  }
}

export default new UsersModel();