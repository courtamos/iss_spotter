const { nextISSTimesForMyLocation } = require('./iss');

const passTimesOutput = function(passTimes) {
  for (const pass of passTimes) { // looping over each pass to access duration && risetime
    //console.log(pass);
    const datetime = new Date(0); // creating a new date object using the current loop
    //console.log(datetime);
    datetime.setUTCSeconds(pass.risetime); // setting the seconds for the specified date

    const duration = pass.duration; // duration of flyover in seconds
    // console.log(duration);

    console.log(`Next pass at ${datetime} for ${duration} seconds!`); // final output to console
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) { // execute this code if error occurs
    return console.log("It didn't work!", error);
  }

  passTimesOutput(passTimes); // call passTimesOutput for final output to console
});

module.exports = { passTimesOutput };