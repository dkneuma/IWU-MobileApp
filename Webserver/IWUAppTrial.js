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
var port = 8080;                          //port for server
var votdApi = require('./votd-api');      //Allows use of Verse of the Day package
var IWU_News_Api = require('./IWU_News_Api')
var Promise = require('promise');
app.listen(port);                         //event listener on port
console.log('Port: ' + port);             //Outputs current port
/**********************************************
Receiving Data
Gets XML Data from various sources, organizes them, and stores them locally.
**********************************************/
//list of sources and places to store them locally
var newsSource = ["http://www.iwusojourn.com/feed/", "http://www.iwupresident.com/feed/", "http://www.iwusga.com/feed/", "http://www.iwuspectrum.com/feed/", "http://www.iwuwildcats.com/rss.php"];

//updateJSON calls several modules that get XML Data, organizes it, and stores it to News.XML
updateJSON();
setInterval(updateJSON,70000);

/**********************************************
Sending Data
Data being sent to the application from our Server
**********************************************/
Baldwin Menu
app.get('/baldwin', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'src/hours.json'));
});

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
function parseXML(tempString,fileLocation){
//Get rid of all of the XML garbage and get the contents
  return new Promise(function(fulfill, reject) {
    try
      {
        newsItemsArray = jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () { //Allows use of jquery
          var $ = window.$; //Targets window
          console.log("Before Parse");
          $("body").append(tempString);//Puts tempString into the windows so that jquery can find it.

          var newsItemsArray = []
          var pubDate
          var newsItems;
          var channelTitle;
          var itemTitle;
          var guid;
          var description;
          var pubDate;
          var content;
          var i=0;
          
          $("body").find('rss').each(function(){  //In each RSS tag
            $(this).children('channel').each(function(){ //In each channel inside each RSS tag

              channelTitle = $(this).children('title').text(); //Store the channel title to put in the array
              
              $(this).children('item').each(function(){ //In each item inside each channel inside each RSS tag

                newsItemsArray[i] = {}; //2 dimensional array to contain each RSS item

                newsItemsArray[i]['channel'] = channelTitle; //Add channel to array

                itemTitle = $(this).children('title').text();
                newsItemsArray[i]['item'] = itemTitle; //Add item to array

                guid = $(this).children('guid').text(); 
                newsItemsArray[i]['guid'] = guid; //Add guid to array

                description = $(this).children('description').text();
                newsItemsArray[i]['description'] = description; // Add description to array

                pubDate = $(this).children('pubDate').text();
                newsItemsArray[i]['date'] = pubDate; // Add pubDate to array

                content = $(this).children('encoded').text();
                newsItemsArray[i]['content'] = content; //Add content to array
                
                i++;
              });        
            });
          return newsItemsArray
          }); 
        
        console.log("Created Array")
        $("body").empty(); //Empty the jquery page
        });
      fulfill(newsItemsArray); // Call next function
    }
    catch (errorObject) {
      reject(errorObject);
    }
  });
}

function updateJSON(){
votdApi.request()
  .then(votdApi.replaceAsciiCodes, votdApi.handleThenableRejection)
  .then(votdApi.writeToFile, votdApi.handleThenableRejection)
  .then(function() {console.log('votd complete');}, votdApi.handleThenableRejection);

IWU_News_Api.request(newsSource)
  .then(parseXML, IWU_News_Api.handleThenableRejection)
  .then(IWU_News_Api.sortArray, IWU_News_Api.handleThenableRejection)
  .then(IWU_News_Api.writeToFile, IWU_News_Api.handleThenableRejection)
  .then(function() {console.log('news complete');}, votdApi.handleThenableRejection);
}