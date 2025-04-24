import { Request, Response } from "express";

export const renderHome = (req: Request, res: Response) => {
    res.render("index");
};

export const renderBeneficios = (req: Request, res: Response) => {
    res.render("beneficios");
};

export const renderContacto = (req: Request, res: Response) => {
    res.render("contacto");
};


