var randomJs = require('random-js')();

/**
* Rolls Vampire 20th Edition Style Dice Pool
* @param {Number} numberOfDice - number of dice to be rolled
* @param {Number} difficulty - difficulty used in the role
* @returns {Object} roll result, properties are: rolls (array of rolls), success (number of successes) and botch (boolean of whether it is a botch)
*/
module.exports.rollV20 = function(numberOfDice, difficulty) {
	console.log("v20 Roll,", numberOfDice, "dice @ diff", difficulty);
	// generate values to be returned
	let result = {
		rolls: randomJs.dice(10, numberOfDice),
		successes: 0,
		botch: false
	}

	let ones = 0;
	let rawSuccesses = 0;

	// run through the rolls and count ones and successes
	result.rolls.forEach(function(element) {
		if (element == 1) {
			ones++;
		} else if (element >= difficulty || element >= 10) {
			rawSuccesses++;
		}
	});

	if (rawSuccesses === 0 && ones > 0) result.botch = true;

	if (rawSuccesses - ones < 0) {
		result.successes = 0;
	} else {
		result.successes = rawSuccesses - ones;
	}

	return result;
}