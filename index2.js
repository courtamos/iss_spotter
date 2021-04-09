const { passTimesOutput } = require('./index');
const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    passTimesOutput(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });