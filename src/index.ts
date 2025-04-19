import express from "express";
import cors from "cors";
import { web } from "./routes/web";
import { views } from "./views";

import dotenv from 'dotenv'; 

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.SERVER_PORT || 3000;

app.use(views);
app.use(web);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});