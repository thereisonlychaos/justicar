var randomJs = require('random-js')();

/**
* Rolls Vampire 20th Edition Style Dice Pool
* @param {Number} numberOfDice - number of dice to be rolled
* @param {Number} difficulty - difficulty used in the role
*/
module.exports.rollV20 = function(numberOfDice, difficulty) {
	// generate values to be returned
	let result = {
		rolls: randomJs.dice(10, numberOfDice),
		successes: 0,
		botch: false
	}

	let ones = 0;

	// run through the rolls and count ones and successes
	result.rolls.forEach(function(element) {
		if (element == 1) {
			ones++;
		} else if (element >= difficulty) {
			result.successes++;
		}
	});
}