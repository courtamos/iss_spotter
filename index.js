const request = require('request');
const { fetchMyIP, fetchCoordByIP, fetchISSFlyOverTimes } = require('./iss');

/*
fetchMyIP((error, ip) => { // temp code for now, used for testing
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});
*/

/*
fetchCoordByIP('205.250.224.26', (error, coordinates) => { // temp code for now, used for testing
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:', coordinates);
});
*/

const coordsForPassing = { latitude: 48.4771, longitude: -123.5313 };

fetchISSFlyOverTimes(coordsForPassing, (error, passingTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned passing times:', passingTimes);
});