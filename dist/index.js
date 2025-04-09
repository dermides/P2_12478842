"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_1 = require("./routes/home");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use('/', home_1.routerMain);
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + "/public"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    return console.log(`http://localhost:${PORT}`);
});
