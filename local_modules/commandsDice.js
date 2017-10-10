var irc = require('irc');
var ircColors = require('irc-colors');
var dice = require("./dice");

var colorScheme = require('./colorscheme')

var replier = null;
var schemas = null;

module.exports.init = function(r, s) {
	replier = r;
	schemas = s;
}

/**
* Rolls dice and returns an IRC string to output
* @param (String) nick - the nick that sent the command
* @param (String) channel - the channel or PM where the command was received
* @param (String) numberOfDice - number of dice rolled
* @param (String) difficulty - difficulty of roll
*/
function commandRoll(nick, channel, numberOfDice, difficulty) {
	if (isNaN(numberOfDice) || isNaN(difficulty)) {
		replier.replyToCommand(nick, channel, irc.colors.wrap(colorScheme.botError, "Invalid parameters. Format is !roll (number of dice) (difficulty). Ex: !roll 3 5"));
	} else {
		let d = parseFloat(numberOfDice);
		let diff = parseFloat(difficulty);

		if (d <= 0 || diff <= 0 || d > 20 || diff > 10) {
			replier.replyToCommand(nick, channel, irc.colors.wrap(colorScheme.botError, "Invalid parameters. Dice pool must be between 1 and 20, and difficulty between 1 and 10."));

		} else {
			let result = dice.rollV20(d, diff);

			let replyString = ircColors.bold(irc.colors.wrap(colorScheme.botReply, nick + " rolled " + numberOfDice + " @ diff " + difficulty + " :")) + irc.colors.wrap("reset", " ");

			replyString += getColoredDicePool(result.rolls, diff) + " ";

			if (result.botch) {
				replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageBotch, "(BOTCH!)"));
			} else if (result.successes > 0) {
				replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageSuccess, "(" + result.successes + " successes)"));
			} else {
				replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageFailure, "(Failed)"));
			}

			replier.replyToCommand(nick, channel, replyString);		
		}
		

	}
}

/**
* Creates a colored die roll
* @param (Number) roll - the result of the roll
* @param (Number) diff - the difficulty it was rolled against
* @return (String) a IRC formatted string with the proper color wrap
*/
function getColoredDieRoll(roll, diff) {
	let colorType = "rollFailure";

	if (roll >= diff || roll === 10) {
		colorType = "rollSuccess";
	}
	if (roll === 1) {
		colorType = "rollOne";
	}

	return irc.colors.wrap(colorScheme[colorType], roll);
}

/**
* Create string of the entire dice pool
* @param {Number[]} rolls - an array of the rolls of the dice pool
* @param {Number} diff - the difficulty they were rolled against
*/
function getColoredDicePool(rolls, diff) {
	let reply = "";
	rolls.forEach(
		function(value, index) {
			if (index !== 0) reply += " ";

			reply += getColoredDieRoll(value, diff);
		}
	)

	return reply;
}

module.exports.commands = {
	"!roll": commandRoll
}