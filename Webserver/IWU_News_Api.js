/**
 * @file Exports a module that collects various XML News sources and converts them to JSON files, removing special characters along the way.
 * @author Tyler Oliver <tyler.oliver18@gmail.com>
 * @module IWU_News_Api
 */

var env = require("jsdom").env;

var depnds = {
  fs: require('fs'),
  Promise: require('promise'),
  request: require('request'),
  $: require('jquery'),        
  jsdom: require("jsdom")           
};

var self = module.exports = {};

/**
 * Define default properties.
 */
Object.defineProperty(self, 'apiEndpointUrl', {
  configurable: false,
  enumerable: true,
  value: 'https://www.biblegateway.com/votd/get/?format=json',
  writable: true
});

Object.defineProperty(self, 'fileWritePath', {
  configurable: false,
  enumerable: true,
  value: 'XML/votd.json',
  writable: true
});

/**
 * From Chris Montany's votd-api package:
 * Marginally helpful utility function to dump promise rejection reason in string form.
 * For simplicity and as an interim solution, falling back to simply dumping stack trace.
 */
self.handleThenableRejection = function(reason) {
  var reasonString = reason;
  if (typeof reason === 'object' && reason instanceof Error) {
    reasonString = reason.stack;
  }
  console.log('rejected with reason:\n', reasonString);
}

/**
 * Performs an HTTP Get to retrieve the contents of a file at a given location. Handles both strings and arrays. 
 * Passes content from the combination of files to the next function
 */
self.request = function(url, fileLocation) {
  var data = "";
  return new depnds.Promise(function(fulfill, reject) {
    if (url.constructor === Array){
      for(i=0; i<url.length; i++){
        self.apiEndpointUrl.value = url[i];
          depnds.request(self.apiEndpointUrl, function(error, response, body) {
          if (response.statusCode === 200) {
            data += body;
          }
          else if (error) {
            reject(error);
          }
          else {
            var errorMessage = 'HTTP API request failed. Received HTTP status code "' + response.statusCode + '" from source' + self.apiEndpointUrl.value;
            reject(new Error(errorMessage));
          }
        });
      }
      fulfill(data);
    }
    else if (url.constructor === String){
      depnds.request(self.apiEndpointUrl, function(error, response, body) {
      if (response.statusCode === 200) {
        fulfill(body,fileLocation);
      }
      else if (error) {
        reject(error);
      }
      else {
        var errorMessage = 'HTTP API request failed. Received HTTP status code "' + response.statusCode + '" from source' + self.apiEndpointUrl.value;
        reject(new Error(errorMessage));
      }
      });
    }
    else{
      reject("URL must be a string or an array");
    }
  });
}

/**
 * Uses JQuery functions to extract data from the XML format and turn it into an array of data
 * Passes array of data to next function
 */
self.parseXML = function(tempString){
//Get rid of all of the XML garbage and get the contents
  return new depnds.Promise(function(fulfill, reject) {
    try{
      env(function(errors,window){
        var $ = require('jquery')(window); 
      
     // depnds.jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () { //Allows use of jquery
        try{
          console.log("Before Parse");
          $("body").append(tempString);//Puts tempString into the windows so that jquery can find it.
          var pubDate
          var newsItems;
          var channelTitle;
          var itemTitle;
          var guid;
          var description;
          var pubDate;
          var content;
          var i=0;
        }
        catch (errorObject){
          reject("Error with Window")
        }
        try{
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
          });
        }
        catch(errorObject){
          reject("Error with Parse")
        }
        
      });
      console.log("Created Array")
      $("body").empty(); //Empty the jquery page
      fulfill(newsItemsArray,fileLocation); // Call next function
    }
    catch (errorObject) {
      reject("Something went wrong removing XML styling");
    }
  });
}

/**
 * Uses JS built in Sort function to sort array data by date. Passes Array and File location to next function.
 */
self.sortArray = function(newsItemsArray,fileLocation){
//Sort all of the xml entries by pubDate
  console.log('sortArray');
  return new depnds.Promise(function(fulfill, reject) {
    try{
      newsItemsArray.sort(function(x, y){
        date1 = new Date(x.date);
        date2 = new Date(y.date);
        return date2 - date1;
      });
      fulfill(newsItemsArray,fileLocation)
    }
    catch (errorObject) {
      reject("Error Sorting Array")
    }
  });
}

/**
 * Writes text to a file path, hard-coded within the function.
 * @param {string} fileContents The final text to write to file. By the time this function is called,
 * there should be no more transformations or validations on the string necessary.
 * @return {Promise} Fulfilled on completion of async file write operation.
 */
self.writeToFile = function(fileContents, fileLocation) {
  var fileString = '{"news":' 
  fileString += JSON.stringify(fileContents);
  fileString += "}"
  fileString = fileString.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
  fileString = fileString.replace(/â€™/g, "");
  self.fileWritePath.value = fileLocation;
  return new depnds.Promise(function(fulfill, reject) {
    depnds.fs.writeFile(self.fileWritePath, fileString, function(errorObject) {
      if (errorObject) {
        reject(errorObject);
      }
      else {
        fulfill();
      }
    });
  });
}