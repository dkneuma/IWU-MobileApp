var MongoClient = require('mongodb').MongoClient;
var user = "AB";
var pass = 28;

communicate(user, pass);

function communicate(user, pass, callback){
	MongoClient.connect("mongodb://localhost/", function(err, db){
		var myDB = db.db("test");
		var document = {"username":user, "password":pass};
		myDB.collection("sampleBase", function(err, sampleBase){
			sampleBase.find({"username":user, "password":pass}).toArray(function(err, results){
				console.log("Searching for username = \"" + user + "\" and password = \"" + pass + "\"");
				if(!results[0]){
					console.log("No entries matching search criteria");
				}
				else{
					console.log(results); // output all records
				}
			});
			myDB.collection("sampleBase", function(err, sampleBase){
				sampleBase.insert(document, function(err, document){
					if(!err){
						console.log("Inserted the following entry:");
						console.log(document);
					}
				});
				setTimeout(function(){
					myDB.collection("sampleBase", function(err, sampleBase){
						sampleBase.find({"username":user, "password":pass}).toArray(function(err, results){
							console.log("The database now has: ");
							console.log(results); // output all records
							console.log("Waiting 3 seconds");
						});
					});
				}, 3000);
			});
		});
		setTimeout(function(){
			myDB.collection("sampleBase", function(err, sampleBase){
				sampleBase.remove(document, function(err, document){
					//if(!err){
					//	console.log("Removed");
					//	console.log(document);
					//}
				});
				myDB.collection("sampleBase", function(err, sampleBase){
					sampleBase.find({"username":user, "password":pass}).toArray(function(err, results){
						console.log("After removing entries with username = \"" + user + "\" and password = \"" + pass + "\", the database now has:");
						if(!results[0]){
							console.log("No entries matching search criteria");
						}
						else{
							console.log(results); // output all records
						}
					});
				});
			});
		}, 6000);
	});
	//callback();
}