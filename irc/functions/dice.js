const randomJs = require('random-js');
const droll = require('droll');

/**
* Initialize Mersenne Twister Engine
*/
const engine = randomJs.engines.mt19937();
engine.autoSeed();

/**
* Max number of times that the same seed will be used
*/
const maxSeedUse = 100;

/**
* Sets the entropy seed
*/
module.exports.resetSeed = function() {
	engine.autoSeed();
}

/**
* Sets a new autoseed if the number of uses so far exceeds maxSeedUse
* @return {Boolean} whether or not the seed was reset
*/
function ensureFreshSeed() {
	if (engine.getUseCount() >= maxSeedUse) {
		console.log('resetting seed since use count is', engine.getUseCount())
		engine.autoSeed();
		return true;
	} else {
		return false;
	}
}

/**
* Rolls Vampire 20th Edition Style Dice Pool
* @param {Number} numberOfDice - number of dice to be rolled
* @param {Number} difficulty - difficulty used in the role
* @returns {Object} roll result, properties are: rolls (array of rolls), success (number of successes) and botch (boolean of whether it is a botch)
*/
module.exports.rollV20 = function(numberOfDice, difficulty) {
	// generate values to be returned
	let result = {
		rolls: randomJs.dice(10, numberOfDice)(engine),
		successes: 0,
		botch: false
	};

	let ones = 0;
	let rawSuccesses = 0;

	// run through the rolls and count ones and successes
	result.rolls.forEach(function(element) {
		if (element === 1) {
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

	ensureFreshSeed();

	return result;
}

/**
* Rolls any arbitary number of dice
* @param {Number} numberOfDice - number of dice to be rolled
* @param {Number} sides - sides of those dice
* @returns {Number[]} - results of the dice rolls
*/
module.exports.rollDice = function(numberOfDice, sides) {
	return randomJS.dice(sides, numberOfDice)(engine);
}

/**
* Rolls dice based on dice notation (e.g. 2d20+2)
* @param {string} diceNotation - dice notation
* @returns {DrollResult}
*/
module.exports.rollDiceNotation = function(diceNotation) {
	console.log("rolling", diceNotation);
	return droll.roll(diceNotation);
}
