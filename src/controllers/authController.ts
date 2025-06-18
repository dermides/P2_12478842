import { Request, Response } from 'express';
//import dotenv from 'dotenv';
import UsersModel from '../models/UsersModel';
import bcrypt from 'bcrypt';

//dotenv.config();

class authController {

    async userLogin(_req: Request, res: Response) {
        res.render('auth/login');
    }
    
    async userRegistro(_req: Request, res: Response) {
        res.render('admin/registro');
    }

    async userAdd(req: Request, res: Response) {

        try {

            const { username, password_hash } = req.body;
            await UsersModel.register(username, password_hash);
            //req.flash('success', '¡Usuario guardado exitosamente!');
            res.redirect('/admin/registro');

        } catch (error) {
            req.flash('success', 'Error en la validación' + error);
        }

    }

    async userPass(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await UsersModel.findByUser(username);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (passwordMatch) {
                res.render('admin/panel', { user: user.username });
                // Aquí podrías establecer la sesión del usuario si estás usando sesiones
                req.session.userId = user.id.toString(); // Si estás usando sesiones
                // req.flash('success', '¡Inicio de sesión exitoso!');

            } else {
                res.render('auth/login', { error: 'Credenciales incorrectas' });
                // req.flash('error', 'Credenciales incorrectas');
            }
        } else {
            res.render('auth/login', { error: 'Credenciales incorrectas' });
            // req.flash('error', 'Credenciales incorrectas');
        }

    }

}

export default new authController();