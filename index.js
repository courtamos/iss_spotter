const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => { // temp code for now, used for testing
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});