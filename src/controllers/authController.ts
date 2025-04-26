import { Request, Response } from "express";

export const renderRegistro = async(req: Request, res: Response) => {
    res.render("auth/registro");
};

export const renderLogin = (req: Request, res: Response) => {
    res.render("auth/login");
};




