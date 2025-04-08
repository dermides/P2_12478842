import express from 'express';
import { routerMain } from './routes/home';

const dotenv = require("dotenv")

dotenv.config()
const app = express()

app.set('views', __dirname + '/src/views')
app.set("view engine", "ejs")

app.use('/', routerMain);

app.use((req, res, next) => {
  res.status(404).render("404", { titulo: "Página 404" });
});

app.use(express.json());

app.use(express.static(__dirname +"/public"));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  return console.log(`http://localhost:${PORT}`);
});
