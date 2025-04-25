"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const home_1 = __importDefault(require("./routes/home"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.SERVER_PORT || 3000;
app.use(express_1.default.static((0, path_1.join)(__dirname + "/public")));
app.set('views', (0, path_1.join)(__dirname + '/views'));
app.set("view engine", "ejs");
app.use('/', home_1.default); // Importar las rutas de home.ts
app.use((req, res) => {
    res.statusCode = 404;
    res.send('404 not Found');
});
app.listen(port, () => {
    console.log(`Servidor esta corriendo en el puerto http://localhost:${port}`);
});
