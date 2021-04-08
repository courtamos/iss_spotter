const { fetchMyIP } = require('./iss');
const { fetchCoordByIP } = require('./iss');

/*
fetchMyIP((error, ip) => { // temp code for now, used for testing
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});
*/

fetchCoordByIP('205.250.224.26', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:', coordinates);
});