var tls = require('tls'),
    fs = require('fs');
var options = {
    host: 'levi.cis.indwes.edu',
  key: fs.readFileSync('client.pem'),
  cert: fs.readFileSync('client.crt'),
  ca: fs.readFileSync('server.crt')
};
var conn = tls.connect(8000, options, function() {
  if (conn.authorized) {
    console.log("Connection authorized by a Certificate Authority.");
  } else {
    console.log("Connection not authorized: " + conn.authorizationError);
  }
    console.log();
});
conn.on("data", function (data) {
  console.log(data.toString());
  conn.end();
});