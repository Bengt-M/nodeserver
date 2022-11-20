import express, { urlencoded, json } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
//const helmet = require('helmet');

import defaultRoutes from './routes/default.js';
import commandRoutes from './routes/command.js';

const app = express();

//app.use(helmet());
//app.use(cors);
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/', defaultRoutes);
app.use('/cmd', commandRoutes);

export default app;