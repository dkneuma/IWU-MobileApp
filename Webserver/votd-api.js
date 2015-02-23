/**
 * @file Exports a module designed to retreive a Biblical text from a specific public HTTP API.
 * This module design is NOT necessarily good; I'm just attempting to crank this out as quickly as possible.
 * @author Chris Montany <chris.montany@myemail.indwes.edu>
 * @module votd-api
 * @example
 * var votdApi = require('./votd-api');
 * votdApi.request()
 *   .then(votdApi.replaceAsciiCodes, votdApi.handleThenableRejection)
 *   .then(votdApi.writeToFile, votdApi.handleThenableRejection)
 *   .then(function() {console.log('complete');}, votdApi.handleThenableRejection);
 */

var depnds = {
  fs: require('fs'),
  Promise: require('promise'),
  request: require('request')
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
  value: 'src/votd.json',
  writable: true
});

/**
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
 * If you want to check for properties, value types, specific values, or perform
 * any transformation of the response before writing to file, this is the function in
 * which to define your operations. If heavy processing with many steps is needed,
 * you should break transformations out into their own function. The resulting new steps will
 * be the validation/parsing step followed by the transformation/processing step.
 * 
 * Attempts to parse the string response body returned by the verse API. Exceptions thrown
 * are free to bubble up execution stack and, when called in a Promise chain, will trigger the
 * rejection of the resulting Promise.
 * 
 * @param {string} bodyText A string containing the response body of the verse API response.
 * @return {Promise} Fulfilled upon successful parsing of response body. Value is a string ready for writing to file.  
 */
self.replaceAsciiCodes = function(bodyText) {
  return new depnds.Promise(function(fulfill, reject) {
    try {
      var parsedResponse = bodyText
      parsedResponse = parsedResponse.replace(/(&*\w+quo+;|&#82*\w+;)/g,"");
      parsedResponse = parsedResponse.replace(/&amp;/g,"&");
      parsedResponse = parsedResponse.replace(/&#169/g,"©");
      fulfill(parsedResponse);
    }
    catch (errorObject) {
      reject(errorObject);
    }
  });
}

/**
 * Performs an HTTP GET request against a remote API designed to return a Biblical text.
 * The API endpoint URL is hard-coded into the function.
 * Nnote that the response module is, in my opinion, rather deficient. If you receive
 * @return {Promise} Fulfilled upon completion of HTTP request. Value will be the raw response body string.
 */
self.request = function() {
  return new depnds.Promise(function(fulfill, reject) {
    depnds.request(self.apiEndpointUrl, function(error, response, body) {
      if (response.statusCode === 200) {
        fulfill(body);
      }
      else if (error) {
        reject(error);
      }
      else {
        var errorMessage = 'HTTP API request failed. Received HTTP status code "' + response.statusCode + '".';
        reject(new Error(errorMessage));
      }
    });
  });
}

/**
 * Writes text to a file path, hard-coded within the function.
 * @param {string} fileContents The final text to write to file. By the time this function is called,
 * there should be no more transformations or validations on the string necessary.
 * @return {Promise} Fulfilled on completion of async file write operation.
 */
self.writeToFile = function(fileContents) {
  return new depnds.Promise(function(fulfill, reject) {
    depnds.fs.writeFile(self.fileWritePath, fileContents, function(errorObject) {
      if (errorObject) {
        reject(errorObject);
      }
      else {
        fulfill();
      }
    });
  });
}
