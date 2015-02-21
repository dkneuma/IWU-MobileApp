/*********************************************
Required Packages/Dependencies
*********************************************/
var express = require('express');         //Allows use of Express
var app = express();
var path = require('path');               //Node module for using filesystem
var echo = [];
var request = require('request');         //Allows use of Request
var fs = require('fs');                   //Node module for reading/writing files
var $ = require('jquery');                //Allows use of jquery
var jsdom = require("jsdom");             //Allows use of jsdom
var window = jsdom.jsdom().parentWindow;  //creates windows for jquery
var port = 8070;                          //port for server
var votdApi = require('./votd-api');      //Allows use of Verse of the Day package
var IWU_News_Api = require('./IWU_News_Api')
app.listen(port);                         //event listener on port
console.log('Port: ' + port);             //Outputs current port
/**********************************************
Receiving Data
Gets XML Data from various sources, organizes them, and stores them locally.
**********************************************/
//list of sources and places to store them locally
var newsSource = ["http://www.iwusojourn.com/feed/", "http://www.iwupresident.com/feed/", "http://www.iwusga.com/feed/", "http://www.iwuspectrum.com/feed/", "http://www.iwuwildcats.com/rss.php"];

//Global variables
var newsItemsArray = [];
var newsString;

//updateJSON calls several modules that get XML Data, organizes it, and stores it to News.XML
updateJSON();
setInterval(updateJSON,70000);

/**********************************************
Sending Data
Data being sent to the application from our Server
**********************************************/
/* Baldwin Menu
app.get('/baldwin', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'src/baldwin.xml'));
});
*/
// Chapel Schedule
app.get('/chapel', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'src/chapel.json'));
});

// News
app.get('/news', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'src/news.json'))
});

// Verse of the Day
app.get('/votd', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'src/votd.json'));
});
/*******************************************
Function Calls
*******************************************/

function updateJSON(){
votdApi.request()
  .then(votdApi.replaceAsciiCodes, votdApi.handleThenableRejection)
  .then(votdApi.writeToFile, votdApi.handleThenableRejection)
  .then(function() {console.log('complete');}, votdApi.handleThenableRejection);

IWU_News_Api.request(newsSource, "src/news.json")
  .then(IWU_News_Api.parseXML, IWU_News_Api.handleThenableRejection)
  .then(IWU_News_Api.sortArray, IWU_News_Api.handleThenableRejection)
  .then(IWU_News_Api.writeToFile, IWU_News_Api.handleThenableRejection)
}