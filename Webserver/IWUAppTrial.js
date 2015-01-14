var express = require('express');
var app = express();
var path = require('path');
var echo = [];
var request = require('request');
var fs = require('fs');
var $ = require('jquery');
var jsdom = require("jsdom");
var window = jsdom.jsdom().parentWindow;
var port = 8070;
app.listen(port);


//Outputs current port
console.log('Port: ' + port);


/**********************************************
Receiving Data
**********************************************/

var newsSource = ["http://www.iwusojourn.com/feed/", "http://www.iwupresident.com/feed/", "http://www.iwusga.com/feed/", "http://www.iwuspectrum.com/feed/", "http://www.iwuwildcats.com/rss.php"];
var destination = ["XML/sojourn.xml", "XML/president.xml", "XML/sga.xml", "XML/spectrum.xml", "XML/athletics.xml"]
var newsItemsArray = [];
var newsArrayLength = 0;
var newsString;

//console.log(newsSource.length);



//setInterval(function () {
    sortNews();
 // },480000	//3600000
//);


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
  //console.log(url);
  request(url, function (error, response, body){
    if (response.statusCode == 200){
      request(url).pipe(fs.createWriteStream(file, function(err){})); //Gets file from internet and writes locally to "file" location.
    }

  })
};

function updateLocalData(callback){
//Get info out of local files and store it to the same string
  var tempString = "";
  var logData;
  for(var i=0; i<destination.length; i++){
    logData = fs.readFileSync(destination[i])// function(err , logData){
    tempString += logData.toString();
    tempString += "\n";
  }
      //console.log(tempString);
    //})
  console.log("updatedData")
  callback(tempString);
}

function writeLocalData(tempString, callback){
//Write string to a new local file.
  fs.writeFileSync('XML/news.xml',tempString);
  
  console.log("NewsFileWrittenFirstTime");
  callback(tempString);
}

function parseXML(tempString, callback){
//Get rid of all of the XML garbage and get the contents
  jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
    var $ = window.$;
    console.log("Before Parse");
    $("body").append(tempString);

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

        channelTitle = $(this).children('title').text();
        channelTitle = channelTitle.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
        channelTitle = channelTitle.replace(/\&/g,"&amp;");
        

        $(this).children('item').each(function(){

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
		      
          newsArrayLength++;
          i++;

          console.log("i"+i);

        });        

      });

    });
    
    console.log("Created Array")

  });
  
  callback();

}

function sortArray(callback){
//Sort all of the xml entries by pubDate
  console.log('sortArray');

    newsItemsArray.sort(function(x, y){
      date1 = new Date(x.date);
      date2 = new Date(y.date);
      return date2 - date1;
    });

  callback();
}

function initialXML(callback){
//Prepare to overwrite news.xml with our own rss feed. This creates the opening tags.
  console.log('xml initialized') 
  newsString = "<root>";
  tempString = "";
  callback();
}

function fillXML(callback){
//Places the array of items into an rss feed, then puts the feed into news.xml
  for (l=0; l<newsArrayLength; l++){
    console.log('item added to XML String');
    tempString = "\n\t<item>\n\t\t<title>" + newsItemsArray[l]['item'] + "</title>\n\t\t<channel>" + newsItemsArray[l]['channel'] + "</channel>\n\t\t<guid>" + newsItemsArray[l]['guid'] + "</guid>\n\t\t<description>" + newsItemsArray[l]['description'] + "</description>\n\t\t<date>"
     + newsItemsArray[l]['date'] + "</date>\n\t\t<content>" + newsItemsArray[l]['content'] + "</content>\n\t</item>";
    newsString += tempString;
  }

  callback();
}

function closeXML(callback){
//Adds closing tags.
  newsString += "\n</root>";
  fs.writeFileSync('XML/news.xml',newsString);
  console.log("File Written");
  callback();
}

/*
function sortNews(callback){
//Run stuff in order


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
updateLocalData(function(tempString){
  writeLocalData(tempString,function(){
    parseXML(tempString,function(){
      sortArray(function(){
        initialXML(function(){
          fillXML(function(){
            closeXML(function(){

            });console.log(1)
          });console.log(2)
        });console.log(3)
      });console.log(4)
    });console.log(5)
  });console.log(6)
});


}
