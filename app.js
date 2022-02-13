const express = require('express');
const bodyParser = require("body-parser");
const defaultRoutes = require('./routes/default.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', defaultRoutes);

module.exports = app;