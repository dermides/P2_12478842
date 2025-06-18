"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderContactos = exports.renderNosotros = exports.renderVentajas = exports.renderBeneficios = exports.renderHome = void 0;
const renderHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("home/index");
});
exports.renderHome = renderHome;
const renderBeneficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("home/beneficios");
});
exports.renderBeneficios = renderBeneficios;
const renderVentajas = (req, res) => {
    res.render("home/ventajas");
};
exports.renderVentajas = renderVentajas;
const renderNosotros = (req, res) => {
    res.render("home/nosotros");
};
exports.renderNosotros = renderNosotros;
const renderContactos = (req, res) => {
    res.render("home/contactos");
};
exports.renderContactos = renderContactos;
