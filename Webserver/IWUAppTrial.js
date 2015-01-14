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
app.listen(port);                         //event listener on port
console.log('Port: ' + port);             //Outputs current port


/**********************************************
Receiving Data

Gets XML Data from various sources, organizes them, and stores them locally.
**********************************************/

//list of sources and places to store them locally
var newsSource = ["http://www.iwusojourn.com/feed/", "http://www.iwupresident.com/feed/", "http://www.iwusga.com/feed/", "http://www.iwuspectrum.com/feed/", "http://www.iwuwildcats.com/rss.php"];
var destination = ["XML/sojourn.xml", "XML/president.xml", "XML/sga.xml", "XML/spectrum.xml", "XML/athletics.xml"]

//global variables
var newsItemsArray = [];
var newsArrayLength = 0;
var newsString;

//sortNews calls several modules that get XML Data, organizes it, and stores it to News.XML

//setInterval(function () {
    sortNews();
 // },480000	//3600000
//);


/**********************************************
Sending Data

Data being sent to the application from our Server
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

// News
app.get('/news', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'XML/news.xml'))
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
//Get files off of the internet and write them to local files

  request(url, function (error, response, body){
    if (response.statusCode == 200){  //If the website provides a good statuscode 
      request(url).pipe(fs.createWriteStream(file, function(err){})); //Gets file from internet and writes locally to "file" location.
    }

  })
};

function updateLocalData(callback){
//Get info out of local files and store it to the same string
  var tempString = "";
  var logData;
  for(var i=0; i<destination.length; i++){
    logData = fs.readFileSync(destination[i])//logData is the contents of the file "destination[i]"
    tempString += logData.toString(); //Add contents to tempString then
    tempString += "\n"; //Add a new line
  }

  console.log("updatedData")
  callback(tempString); //Call next function synchronously and pass tempString
}

function writeLocalData(tempString, callback){
//Write string to a new local file.
 
  fs.writeFileSync('XML/news.xml',tempString); //Write tempString to news.xml file
  
  console.log("NewsFileWrittenFirstTime");  

  callback(tempString);  ////Call next function synchronously and pass tempString
}

function parseXML(tempString, callback){
//Get rid of all of the XML garbage and get the contents
  jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () { //Allows use of jquery
    var $ = window.$; //Targets window
    console.log("Before Parse");

    $("body").append(tempString);//Puts tempString into the windows so that jquery can find it.

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

    $("body").find('rss').each(function(){  //In each RSS tag

      $(this).children('channel').each(function(){ //In each channel inside each RSS tag

        //clean up XML by removing tab, new line, and other junk characters
        channelTitle = $(this).children('title').text();
        channelTitle = channelTitle.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
        channelTitle = channelTitle.replace(/\&/g,"&amp;");
        

        $(this).children('item').each(function(){ //In each item inside each channel inside each RSS tag

          newsItemsArray[i] = {}; //2 dimensional array to contain each RSS item

          //clean up XML by removing tab, new line, and other junk characters
          itemTitle = $(this).children('title').text();
          itemTitle = itemTitle.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
          itemTitle = itemTitle.replace(/\&/g,"&amp;");
          if(itemTitle==""){
            itemTitle = "False";
          }

          newsItemsArray[i]['item'] = itemTitle; //Add item to array

          if(channelTitle==""){
            channelTitle = "False";
          }
          newsItemsArray[i]['channel'] = channelTitle; //Add channel to array

          guid = $(this).children('guid').text(); 
          if(guid ==""){
            guid = "False";
          }
          newsItemsArray[i]['guid'] = guid; //Add guid to array

          //clean up XML by removing tab, new line, and other junk characters
          description = $(this).children('description').text();
          description = description.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
          description = description.replace(/\&/g,"&amp;");
          if(description==""){
            description = "False";
          }
          newsItemsArray[i]['description'] = description; // Add description to array

          pubDate = $(this).children('pubDate').text();
          if(pubDate==""){
            pubDate = "False";
          }
          newsItemsArray[i]['date'] = pubDate; // Add pubDate to array

          //clean up XML by removing tab, new line, and other junk characters
          content = $(this).children('encoded').text();
          content = content.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
          content = content.replace(/\&/g,"&amp;");
          if(content==""){
            content = "False";
          }
          newsItemsArray[i]['content'] = content; //Add content to array
		      
          newsArrayLength++; //Increment a variable representing length of array
          i++;

          console.log("i"+i);
        });        
      });
    });
    console.log("Created Array")
  });
  callback(); //Call next function
}

function sortArray(callback){
//Sort all of the xml entries by pubDate
  console.log('sortArray');

    newsItemsArray.sort(function(x, y){
      date1 = new Date(x.date);
      date2 = new Date(y.date);
      return date2 - date1;
    });

  callback(); //Call next function
}

function fillXML(callback){
//Places the array of items into an rss feed, then puts the feed into news.xml

  console.log('xml initialized') 
  newsString = "<root>";

  for (l=0; l<newsArrayLength; l++){
    console.log('item added to XML String');
    newsString += "\n\t<item>\n\t\t<title>" + newsItemsArray[l]['item'] + "</title>\n\t\t<channel>" + newsItemsArray[l]['channel'] + "</channel>\n\t\t<guid>" + newsItemsArray[l]['guid'] + "</guid>\n\t\t<description>" + newsItemsArray[l]['description'] + "</description>\n\t\t<date>"
     + newsItemsArray[l]['date'] + "</date>\n\t\t<content>" + newsItemsArray[l]['content'] + "</content>\n\t</item>";
    //NewsString contains all the array contents. We're preparing to add these array contents to our XML
  }
  newsArrayLength = 0; //In case this is called again.

  //Adds closing tags.
  newsString += "\n</root>"; //Add closing tag
  fs.writeFileSync('XML/news.xml',newsString); //Write to file
  console.log("File Written");

  callback(); //Call next function
}

//Run stuff in order

/*
  setTimeout(updateLocalData,20000);
  setTimeout(writeLocalData,45000);
  setTimeout(parseXML,70000);
  setTimeout(sortArray, 200000);
  setTimeout(initialXML,300000);
  setTimeout(fillXML,320000);
  setTimeout(closeXML,550000);
*/

function sortNews(){
//Run stuff in order
  for(var i=0; i<newsSource.length-1; i++){
      newsRequest(newsSource[i],destination[i]);
  }

//Not sure what is the right order. If this is it, then news.XML is created empty 

//Runs functions one after another, beginning with UpdateLocalData and ending in closeXML. Currently does not run properly. 
  updateLocalData(function(tempString){
    writeLocalData(tempString,function(){
      parseXML(tempString,function(){
        sortArray(function(){
            fillXML(function(){
          });console.log(1)
        });console.log(2)
      });console.log(3)
    });console.log(4)
  });

//This might be the right order. Variables don't pass correctly in this.
/*
  closeXML(function(){
    fillXML(function(){
      initialXML(function(){
        sortArray(function(){
          parseXML(tempString,function(){
            writeLocalData(tempString,function(){
              updateLocalData(function(tempString){
              });
            });
          });
        });
      });
    });
  });
*/

}
