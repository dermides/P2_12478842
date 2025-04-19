import express from 'express';

const views = express();

views.use(express.static(__dirname +"/public"));
views.set('views', __dirname + '/views')
views.set("view engine", "ejs")

export { views };
