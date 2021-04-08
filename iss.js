const request = require('request'); // node request module
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => { // fetch IP address from JSON API
    if (error) { // execute code if error
      callback(error, null); // pass into callback to indicate something's wrong
      return;
    }

    if (response.statusCode !== 200) { // execute if response.statusCode isn't 200
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); // pass into callback to indicate something's wrong
      return;
    }

    const ip = JSON.parse(body).ip; // capturing ip in a variable
    console.log("It worked! Returned IP: ", ip); // console.log IP addess that was fetched
  });
};

module.exports = { fetchMyIP };