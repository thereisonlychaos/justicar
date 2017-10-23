const irc = require('irc');
const ircColors = require('irc-colors');
const droll = require('droll');
const chance = require("../functions/dice");

const colorScheme = require('../settings/colorscheme');

const Command = require('../classes/Command');
const MessageStack = require('../classes/MessageStack');


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

/*********************************
* !roll
**********************************
* create roll command
*/
let rollCommand = new Command("!roll", "Make a standard V20 roll.");

// Add parameters
rollCommand.addParameter("numberOfDice", "Number", "number of dice", true,
	// validator
	function(val) {
		if (val <= 0 || val > 20) {
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

// Add remainder description
rollCommand.remainderDescription = "reason";

// Create command function
rollCommand.commandFunction = function(nick, channel, values, remainder) {
	let result = chance.rollV20(values.numberOfDice, values.difficulty);
	let commandResult = new MessageStack();

	let rollDescription = nick + " rolled " + values.numberOfDice + " @ diff " + values.difficulty;

	if (remainder.length > 0) rollDescription += " [" + remainder + "]";

	rollDescription += ":"

	let replyString = ircColors.bold(irc.colors.wrap(colorScheme.botReply, rollDescription)) + irc.colors.wrap("reset", " ");

	replyString += getColoredDicePool(result.rolls, values.difficulty) + " ";

	if (result.botch) {
		replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageBotch, "(BOTCH!)"));
	} else if (result.successes > 0) {
		replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageSuccess, "(" + result.successes + " successes)"));
	} else {
		replyString += ircColors.bold(irc.colors.wrap(colorScheme.messageFailure, "(Failed)"));
	}

	commandResult.addPublicMessage(replyString, nick, channel);

	return commandResult;
}

// push into commands array
module.exports.commands.push(rollCommand);

/*********************************
* !rpgroll
**********************************
* create rpg roll command
*/
let rpgrollCommand = new Command("!rpgroll", "Roll RPG style dice (2d20+2).");

// add parameters
rpgrollCommand.addParameter("diceNotation", "String", "dice formula", true,
	// validator
	function(val) {
		console.log('validating:', val);
		return droll.validate(val);
	},
	// example
	"2d10+5"
)

// create command function
rpgrollCommand.commandFunction = function(nick, channel, values, remainder) {
	let commandResult = new MessageStack();
	let result = chance.rollDiceNotation(values.diceNotation);

	let rollDescription = nick + " rolled " + values.diceNotation + ":";

	let replyString = ircColors.bold(irc.colors.wrap(colorScheme.botReply, rollDescription)) + irc.colors.wrap("reset", " ");

	replyString += result.total + " [" + result.toString() + "]";

	commandResult.addPublicMessage(replyString, nick, channel);

	return commandResult;
}

// push into commands array
module.exports.commands.push(rpgrollCommand);
