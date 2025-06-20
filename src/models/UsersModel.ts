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
  
  async login(req: any, res: any) {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    req.session.userId = user.id;
    return res.json({ message: "Inicio de sesión exitoso" });
  }

  async findById(id: number) {
    return await Users.findByPk(id);
  }

  async findByEmail(email: string) {
    return await Users.findOne({ where: { correo: email } });
  }

  async findByGoogleId(googleId: string) {
    return await Users.findOne({ where: { googleId } });
  }

  async createGoogleUser(profile: any) {
    return await Users.create({
      googleId: profile.id,
      nombre: profile.displayName,
      correo: profile.emails?.[0].value,
    });
  }

}

export default new UsersModel();