import { Request, Response } from 'express';
//import session from "express-session";

class adminController {

    async panelAdmin(req: Request, res: Response) {
        if (req.session.userId) {
            res.render('admin/panel');
        } else {
            res.status(401).send("Acceso denegado");
        }
        
    }


}

export default new adminController();