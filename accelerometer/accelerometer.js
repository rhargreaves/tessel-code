// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
  This basic accelerometer example logs a stream
  of x, y, and z data from the accelerometer
 *********************************************/

var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

// Initialize the accelerometer.
accel.on('ready', function () {
	// Stream accelerometer data
		console.log("Simon says, move forward (or err.. back, and give it some welly!)");

		var positions = [];

		accel.on('data', function(xyz) {

			if(xyz[0] < 0.10) {
				xyz[0] = 0;
			}

			positions.push({ x: xyz[0], y: xyz[1] })

			if(positions.length >= 4) {

				var median_x = positions.map(function(xyz) {
					return xyz.x;
				}).sort()[positions.length/2];

				median_x = positions.reduce(function(acc, curVal) {
					acc += curVal.x;
					return acc;
				}, 0);

				//console.log("Sum X: " + median_x);

				if(median_x > positions[0].x && median_x > 2) {
					console.log("WIN!");
				} else {
				//	console.log("LOSE");
				}

				positions = [];




			}
		});

});

accel.on('error', function(err){
	console.log('Error:', err);
});
