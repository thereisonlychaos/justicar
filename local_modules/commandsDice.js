const irc = require('irc');
const ircColors = require('irc-colors');
const dice = require("./dice");

const colorScheme = require('./colorscheme')
const Command = require('./classes/Command');
const MessageStack = require('./classes/MessageStack');

let replier = null;
let schemas = null;

/**
* Initializes the schemas and IRC replier
* @param {object} schemas - the schemas object from Mongoose used to access the database
*/
module.exports.init = function(s) {
	schemas = s;
}

/**
* This array stores command. All commands modules must have this to be processed by ircinterface.js
*/
module.exports.commands = [];



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

/**
* create roll command
*/
let rollCommand = new Command("!roll", "Make a standard V20 roll.");
rollCommand.addParameter("numberOfDice", "Number", "number of dice", true,
	// validator
	function(val) {
		if (val <= 0 || d > 20) {
			return "Dice pool must be between 1 and 20";
		} else {
			return true;
		}
	},
	"4"
)
rollCommand.addParameter("difficulty", "Number", "difficulty", true,
	function(val) {
		if (val <= 0 || val > 10) {
			return "Difficulty must be between 1 and 10";
		} else {
			return true;
		}
	},
	"8"
)
rollCommand.commandFunction = function(parameters) {
	let result = dice.rollV20(parameters.numberOfDice, parameters.difficulty);
	let commandResult = new MessageStack();

	let replyString = ircColors.bold(irc.colors.wrap(colorScheme.botReply, nick + " rolled " + numberOfDice + " @ diff " + difficulty + " :")) + irc.colors.wrap("reset", " ");

	replyString += getColoredDicePool(result.rolls, diff) + " ";

	if (result.botch) {
		replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageBotch, "(BOTCH!)"));
	} else if (result.successes > 0) {
		replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageSuccess, "(" + result.successes + " successes)"));
	} else {
		replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageFailure, "(Failed)"));
	}

	commandResult.addPublicMessage(replyString);

	return commandResult;
}
