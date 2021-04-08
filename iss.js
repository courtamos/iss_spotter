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

const fetchCoordByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) { // execute code if error
      callback(error, null); // pass into callback to indicate something's wrong
      process.exit();
    }

    if (response.statusCode !== 200) { // execute if response.statusCode isn't 200
      const msg = (`Status Code ${response.statusCode} when fetching coordinates: ${body}`, null);
      callback(Error(msg), null); // pass into callback to indicate something's wrong
      process.exit();
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) { // execute code if error
      callback(error, null); // pass into callback to indicate something's wrong
      process.exit();
    }

    if (response.statusCode !== 200) { // execute if response.statusCode isn't 200
      const msg = (`Status Code ${response.statusCode} when fetching ISS pass times:: ${body}`, null);
      callback(Error(msg), null); // pass into callback to indicate something's wrong
      process.exit();
    }

    const passes = JSON.parse(body).response; // capturing passing times in a variable
    callback(null, passes);

  });
};

module.exports = { fetchMyIP, fetchCoordByIP, fetchISSFlyOverTimes };