import express from 'express';
import { routerMain } from './routes/home';
import dotenv from 'dotenv'; 

dotenv.config()
const app = express()

app.set('views', __dirname + '/views')
app.set("view engine", "ejs")

app.use('/', routerMain);

app.use(express.json());

app.use(express.static(__dirname +"/public"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  return console.log(`http://localhost:${PORT}`);
});

