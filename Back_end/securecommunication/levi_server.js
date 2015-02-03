var fs = require('fs');
var tls = require('tls');
var options = {
  key: fs.readFileSync('server.pem'),
  cert: fs.readFileSync('server.crt'),
  ca: fs.readFileSync('client.crt')
};
tls.createServer(options, function (client) {
  client.write("Hello Secure World\r\n");
  client.end();
}).listen(8080);