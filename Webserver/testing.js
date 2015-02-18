var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/", function(err, db){
	var myDB = db.db("test");
	myDB.collection("sampleBase", function(err, sampleBase){
		items.toArray(function(err, itemArr){
			console.log("Document Array: ");
			console.log(itemArr);
		});
	});
	sampleBase.find(function(err, items){
		items.each(function(err, item){
			if(item){
				console.log("Singular Document: ");
				console.log(item);
			}
		});
	});
	sampleBase.findOne({type:'username'}, function(err, item){
		console.log("Found One: ");
		console.log(item);
	});
});
setTimeout(function(){ db.close(); }, 3000);