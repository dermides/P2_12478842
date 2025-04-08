"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_1 = require("../routes/home");
const ejs = require('ejs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const app = (0, express_1.default)();
app.set('views', path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(path.join(__dirname, "public")));
app.use('/', home_1.routerMain);
app.use((req, res, next) => {
    res.status(404).render("404", { titulo: "Página 404" });
});
app.use(express_1.default.json());
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, () => {
    return console.log(`http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map