const request = require('request'); // node request module

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
    callback(null, ip); // console.log IP addess that was fetched
  });
};

const fetchCoordByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) { // execute code if error
      callback(error, null); // pass into callback to indicate something's wrong
      process.exit();
    }

    if (response.statusCode !== 200) { // execute if response.statusCode isn't 200
      const msg = (`Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`, null);
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

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => { // calling fetchMyIP
    if (error) { // execute this code if error occurs during fetchMyIP
      return callback(error, null);
    }
    // if no error occurs in fetchMyIP continue...
    
    fetchCoordByIP(ip, (error, location) => { // calling fetchCoordByIP
      if (error) { // execute this code if error occurs during fetchCoordByIP
        return callback(error, null);
      }
      // if no error occurs in fetchCoordByIP continue...

      fetchISSFlyOverTimes(location, (error, nextPasses) => { // calling detchISSFlyOverTimes
        if (error) { // execute this code if error occurs during fetchISSFlyOverTimes
          return callback(error, null);
        }
        // if no error occurs in fetchISSFlyOverTimes continue...

        callback(null, nextPasses); // if eveything passes
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };