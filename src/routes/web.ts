import express from "express";
import { home } from "./home";

export const web = express();

web.use('/', home);