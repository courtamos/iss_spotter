const request = require('request-promise-native'); // requiring request-promise-native

const fetchMyIP = function() { // requesting users IP address
  return request('https://api.ipify.org?format=json'); // returning promise of request for IP data, as a JSON string
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip; // extracting the ip from JSON string using parse
  return request(`https://freegeoip.app/json/${ip}`); // returning promise of request for coordinates
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body); // extracting lat && long from body data
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url); // returning promise of request for fly over data
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = { nextISSTimesForMyLocation };