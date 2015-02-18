var MongoClient = require('mongodb').MongoClient;
var tls = require('tls'),
    fs = require('fs'),
    msg = "New Hello from a secure port";
var options = {
 
  key: fs.readFileSync('server.pem'),
  cert: fs.readFileSync('server.crt'),
  ca: fs.readFileSync('client.crt')
};
tls.createServer(options, function(s) {
	var whatever = queryDatabase("Alpha", 45);
	whatever = JSON.stringify(whatever);
	console.log(whatever); // whatever is undefined
	//putInDatabase("Alpha", 45);
	//Receive username and password from Client
	//Update sampleBase with username and password
	//Query sampleBase for username and password
	//Pass username and password back to client
	//s.write(whatever);
	//s.pipe(s);
}).listen(8000);

function queryDatabase(user, pass){
	MongoClient.connect("mongodb://localhost/", function(err, db){
		var myDB = db.db("test");
		var document = {"username":user, "password":pass};
		myDB.collection("sampleBase", function(err, sampleBase){
			sampleBase.find({"username":user, "password":pass}).toArray(function(err, results){
				console.log("Searching for username = \"" + user + "\" and password = \"" + pass + "\"");
				if(!results[0]){
					console.log("No entries matching search criteria");
					return "No entries matching search criteria";
				}
				else{
					console.log(results[0]); // output all records
					return results[0];
				}
			});
		});	
	});
	//return document;
}

function putInDatabase(user, pass){
	MongoClient.connect("mongodb://localhost/", function(err, db){
		var myDB = db.db("test");
		var document = {"username":user, "password":pass};
		myDB.collection("sampleBase", function(err, sampleBase){
			var myDB = db.db("test");
			var document = {"username":user, "password":pass};
			sampleBase.insert(document, function(err, document){
				if(!err){
					console.log("Inserted the following entry:");
					console.log(document);
				}
			});
		});	
	});
}