import { Request, Response } from "express";

export const renderRegistro = async(_req: Request, res: Response) => {
    res.render("auth/registro");
};

export const renderLogin = (_req: Request, res: Response) => {
    res.render("auth/login");
};




