"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMain = void 0;
const express_1 = require("express");
exports.routerMain = (0, express_1.Router)();
exports.routerMain.get('/', (req, res) => {
    res.render('index', { titulo: "Sistema de alquiler" });
});
