/**
 * @file Exports a module that collects various XML News sources and converts them to JSON files, removing special characters along the way.
 * @author Tyler Oliver <tyler.oliver18@gmail.com>
 * @module IWU_News_Api
 */

var depnds = {
  fs: require('fs'),
  Promise: require('promise'),
  request: require('request'),          
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
  value: "src/news.json",
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
self.request = function(url) {
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
        fulfill(body);
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

self.fixSpecialCharacters = function(data){
  return new depnds.Promise(function(fulfill,reject){
    try{
      data = data.replace(/â€™|â€˜/g,"'");
      data = data.replace(/â€œ/g,'“');
      data = data.replace(/â€/g,'”');
      fulfill(data);

    }
    catch (errorObject){
      reject(errorObject)
    }
  });
}
/**
 * Uses JS built in Sort function to sort array data by date. Passes Array and File location to next function.
 */
self.sortArray = function(newsItemsArray){
//Sort all of the xml entries by pubDate
  console.log('sortArray');
  return new depnds.Promise(function(fulfill, reject) {
    try{
      newsItemsArray.sort(function(x, y){
        date1 = new Date(x.date);
        date2 = new Date(y.date);
        return date2 - date1;
      });
      fulfill(newsItemsArray);
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
self.writeToFile = function(fileContents) {
  var fileString = '{"news":' 
  fileString += JSON.stringify(fileContents);
  fileString += "}"
  fileString = fileString.replace(/(\\t0|\\n|\\t|]]>|\uFFFD)/g,"");
  fileString = fileString.replace(/â€™/g, "");
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