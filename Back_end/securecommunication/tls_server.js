var tls = require('tls'),
    fs = require('fs'),
    msg = "New Hello from a secure port";
var options = {
 
  key: fs.readFileSync('server.pem'),
  cert: fs.readFileSync('server.crt'),
  ca: fs.readFileSync('client.crt')
};
tls.createServer(options, function (s) {
  s.write(msg+"\n");
  s.pipe(s);
}).listen(8000);
