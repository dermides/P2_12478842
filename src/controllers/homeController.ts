import { Request, Response } from "express";

export const renderHome = async(req: Request, res: Response) => {
    res.render("index");
};

export const renderBeneficios = async(req: Request, res: Response) => {
    res.render("home/beneficios");
};

export const renderVentajas = (req: Request, res: Response) => {
    res.render("home/ventajas");
};

export const renderNosotros = (req: Request, res: Response) => {
    res.render("home/nosotros");
};

export const renderContactos = (req: Request, res: Response) => {
    res.render("home/contactos");
};


