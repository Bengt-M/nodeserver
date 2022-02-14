const express = require('express');
const bodyParser = require("body-parser");
//const helmet = require('helmet');

const defaultRoutes = require('./routes/default.js');
const commandRoutes = require('./routes/command.js');

const app = express();

//app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', defaultRoutes);
app.use('/cmd', commandRoutes);

module.exports = app;