"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController_1 = require("../controllers/homeController");
const routeHome = (0, express_1.Router)();
routeHome.get("/beneficios", homeController_1.renderBeneficios);
exports.default = routeHome;
