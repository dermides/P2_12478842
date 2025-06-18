import { Request, Response } from "express";

export const renderHome = async (_req: Request, res: Response) => {
    res.render("index");
};

export const renderBeneficios = async (_req: Request, res: Response) => {
    res.render("home/beneficios");
};

export const renderVentajas = (_req: Request, res: Response) => {
    res.render("home/ventajas");
};

export const renderNosotros = (_req: Request, res: Response) => {
    res.render("home/nosotros");
};

export const renderContactos = (req: Request, res: Response) => {
    res.render("home/contactos", { message: req.flash() });
};

export const renderPagos = (req: Request, res: Response) => {
    res.render("home/pagos", { message: req.flash() });
};


