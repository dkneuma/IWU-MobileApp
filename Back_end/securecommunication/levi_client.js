var fs = require('fs');
var tls = require('tls');
var options = {
  hostname: 'levi.cis.indwes.edu',
  port: 8080,
  path: '/',
  method: 'POST',
  key: fs.readFileSync('test/client.pem'),
  cert: fs.readFileSync('test/client.crt'),
  ca: fs.readFileSync('test/server.crt')
};
function getConnection(connName){
	//var client = net.connect({port: 8080, host:'localhost'}, function() {
	var client = tls.connect(options, function(res) {
	console.log(connName + ' Connected: ');
	console.log('   local = %s:%s', this.localAddress, this.localPort);
	console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
	this.setTimeout(500);
	this.setEncoding('utf8');
	this.on('data', function(data) {
		console.log(connName + " From Server: " + data.toString());
	this.end();
	});
	this.on('end', function() {
	console.log(connName + ' Client disconnected');
	});
	this.on('error', function(err) {
	console.log('Socket Error: ', JSON.stringify(err));
	});
	this.on('timeout', function() {
	console.log('Socket Timed Out');
	 });
	this.on('close', function() {
	console.log('Socket Closed');
	});
	});
	return client;
}
function writeData(socket, data){
var success = !socket.write(data);
	if (!success){
		(function(socket, data){
			socket.once('drain', function(){
				writeData(socket, data);
			});
		})(socket, data);
	}
}
var localclient = getConnection("localclient");

writeData(localclient, "Test Data");
