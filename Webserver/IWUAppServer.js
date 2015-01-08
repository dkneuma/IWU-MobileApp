var express = require('express');
var app = express();
var path = require('path');
var port = 8080;
app.listen(port);
var echo = [];
var request = require('request');
var fs = require('fs');
var $ = require('jquery');
var jsdom = require("jsdom");
var window = jsdom.jsdom().parentWindow;
var newsSource;
var destination;
var newsItemsArray = [];

//Outputs current port
console.log('Port: ' + port);


/**********************************************
Receiving Data
**********************************************/
newsSource = ["http://www.iwusojourn.com/feed/", "http://www.iwupresident.com/feed/", "http://www.iwusga.com/feed/", "http://www.iwuspectrum.com/feed/", "http://www.iwuwildcats.com/rss.php"];
destination = ["XML/sojourn.xml", "XML/president.xml", "XML/sga.xml", "XML/spectrum.xml", "XML/athletics.xml"]
//console.log(newsSource.length);
/*
setInterval(
	function () {
		for(var i=0; i<newsSource.length; i++){
			setTimeout(newsRequest(newsSource[i],destination[i]),20000);
		}
		console.log("One Interval")
		sortNews();
	}, 30000//3600000
);
*/

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
app.get('/news', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'XML/news.xml'));
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
};
/*
function sortNews(){

	for(var i=0; i<destination.length; i++){
		fs.readFile(destination[i], function(err , logData){
			tempString += logData.toString();
			tempString += "\n";
			//console.log(tempString);
		})
	}

	fs.writeFile('XML/news.xml',tempString, function(err){
		console.log('Compiled XML');
	});

	jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
			var $ = window.$;
			//console.log(newsString);
			$("body").append(newsString);

			var pubDate
			var newsItems;
			var channelTitle;
			var itemTitle;
			var guid; //Permalink
			var description;
			var pubDate;
			var content;
			var i=0;

		//Channel Title, Item Title, guid, Description, PubDate, content:encoded

		$("body").find('rss').each(function(){

			$(this).children('channel').each(function(){

				console.log('am i here?')

				channelTitle = $(this).children('title').text();
				channelTitle = channelTitle.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
				channelTitle = channelTitle.replace(/\&/g,"&amp;");

				$(this).children('item').each(function(){

					var j=0;
					newsItemsArray[i] = {};

					itemTitle = $(this).children('title').text();
					itemTitle = itemTitle.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
					itemTitle = itemTitle.replace(/\&/g,"&amp;");
					if(itemTitle==""){
						itemTitle = "False";
					}

					newsItemsArray[i]['item'] = itemTitle;

					if(channelTitle==""){
						channelTitle = "False";
					}
					newsItemsArray[i]['channel'] = channelTitle;


					guid = $(this).children('guid').text();
					if(guid ==""){
						guid = "False";
					}
					newsItemsArray[i]['guid'] = guid;

					description = $(this).children('description').text();
					description = description.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
					description = description.replace(/\&/g,"&amp;");
					if(description==""){
						description = "False";
					}
					newsItemsArray[i]['description'] = description;

					pubDate = $(this).children('pubDate').text();
					pubDateArray.push(pubDate);
					if(pubDate==""){
						pubDate = "False";
					}
					newsItemsArray[i]['date'] = pubDate;

					content = $(this).children('encoded').text();
					content = content.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
					content = content.replace(/\&/g,"&amp;");
					if(content==""){
						content = "False";
					}
					newsItemsArray[i]['content'] = content;
					i++;

					console.log(newsItemsArray[i]);

				});

			});

		});
	});
	console.log(newsItemsArray);

		newsItemsArray.sort(function(x, y){
			date1 = new Date(x.date);
			date2 = new Date(y.date);
			return date2 - date1;
		});


		newsString = "<root>";

		for (l=0; l<newsItemsArray.length; l++){

			console.log('item added');
			var tempString = "\n\t<item>\n\t\t<title>" + newsItemsArray[l]['item'] + "</title>\n\t\t<channel>" + newsItemsArray[l]['channel'] + "</channel>\n\t\t<guid>" + newsItemsArray[l]['guid'] + "</guid>\n\t\t<description>" + newsItemsArray[l]['description'] + "</description>\n\t\t<date>"
			+ newsItemsArray[l]['date'] + "</date>\n\t\t<content>" + newsItemsArray[l]['content'] + "</content>\n\t</item>";
			newsString += tempString;
		}

		newsString += "\n</root>";

		fs.writeFile('XML/news.xml',newsString, function(err){});

		console.log("File Written");


};
*/
