import app from './app.js';
import http from 'http';
require('dotenv').config();

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port);
console.log("Running on port ", port);
