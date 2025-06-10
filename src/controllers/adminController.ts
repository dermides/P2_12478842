import { Request, Response } from 'express';

class adminController {

    async panelAdmin(_req: Request, res: Response) {
        res.render('admin/panel');
    }

    
}

export default new adminController();