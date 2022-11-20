import app from './app.js';
import http from 'http';

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port);
console.log("Running on port ", port);
