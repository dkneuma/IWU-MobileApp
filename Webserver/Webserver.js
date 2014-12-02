var express = require('express');
var app = express();
var path = require('path');
var port = 8080;
app.listen(port);
var echo = [];
var request = require('request');
var fs = require('fs');
var newsSource;
var destination;

//Outputs current port
console.log('Port: ' + port);


/**********************************************
Receiving Data
**********************************************/
newsSource = ["http://www.iwusojourn.com/feed/", "http://www.iwupresident.com/feed/", "http://www.iwusga.com/feed/", "http://www.iwuspectrum.com/feed/", "http://www.iwuwildcats.com/rss.php"];
destination = ["XML/sojourn.xml", "XML/president.xml", "XML/sga.xml", "XML/spectrum.xml", "XML/athletics.xml"]
//console.log(newsSource.length);

for(var i=0; i<newsSource.length; i++){
	setTimeout(newsRequest(newsSource[i],destination[i]),20000);
}

/**********************************************
Sending Data
**********************************************/

// Baldwin Menu
app.get('/baldwin', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'baldwin.xml'));
});

// Chapel Schedule
app.get('/chapel', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'chapel.xml'));
});

// News Sources
app.get('/athletics', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'XML/athletics.xml'));
});

/*
app.get('/portal', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'portal.xml'));
});
*/

app.get('/president', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'XML/president.xml'));
});
app.get('/sga', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'XML/sga.xml'));
});
app.get('/sojourn', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'XML/sojourn.xml'));
});
app.get('/spectrum', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'XML/spectrum.xml'));
});

// Verse of the Day
app.get('/votd', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'votd.xml'));
});

// Current / Future Weather
app.get('/weather-current', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'weather-current.xml'));
});
app.get('/weather-future', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'weather-future.xml'));
});

/*******************************************
Function Calls
*******************************************/

function newsRequest(url, file) {
	//console.log(url);
	request(url, function (error, response, body){
		if (response.statusCode == 200){
			//console.log("success");
			//console.log(response.statusCode);
			request(url).pipe(fs.createWriteStream(file));
		}
		else {
			//console.log("I done messed up");
			//console.log(response.statusCode);
		}
	})
}
