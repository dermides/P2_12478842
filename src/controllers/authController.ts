import { Request, Response } from 'express';
//import dotenv from 'dotenv';
import UsersModel from '../models/UsersModel';

//dotenv.config();

class authController {

    async userRegistro(_req: Request, res: Response) {
        res.render('admin/registro');
    }

    async userAdd(req: Request, res: Response) {
        const { username, password_hash } = req.body;
        await UsersModel.register(username, password_hash);
        req.flash('success', '¡Usuario guardado exitosamente!');
        res.redirect('auth/registro');
    }


}

export default new authController();