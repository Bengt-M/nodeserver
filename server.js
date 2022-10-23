const app = require('./app.js');
//const https = require('https');
const http = require('http');
// const fs = require('fs');

//const options = {
//    cert: fs.readFileSync('/etc/pki/tls/certs/nuc.hemma.crt'),
//    key: fs.readFileSync('/etc/pki/tls/private/nuc.hemma.key'),
//    ca: fs.readFileSync('/etc/pki/tls/cert.pem')
// };
//console.log("key= ", options.key);
//console.log("cert= ", options.cert);
//console.log("ca= ", options.ca);

const port = process.env.PORT || 3001;
//const server = https.createServer(options, app);
const server = http.createServer(app);

server.listen(port);
console.log("Running on port ", port);
