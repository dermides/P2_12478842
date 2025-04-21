import express from "express";
import cors from "cors";
import { home } from "./routes/home";
import { web } from "./routes/web";

import dotenv from 'dotenv'; 

dotenv.config();

const app = express();

app.use(cors());
const port = process.env.SERVER_PORT || 3000;

app.use(express.static(__dirname +"/public"));
app.set('views', __dirname + '/views')
app.set("view engine", "ejs")

app.use('/',home);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});