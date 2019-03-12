const mWeather = require('../modules/weather.js');

const Command = require('../classes/Command');
const MessageStack = require('../classes/MessageStack');


/**
* This array stores command. All commands modules must have this to be processed by ircinterface.js
*/
module.exports.commands = [];

/*********************************
* !roll
**********************************
* create roll command
*/
let weatherCommand = new Command("!weather", "Get the current IC weather.");

// Create command function
weatherCommand.commandFunction = function(nick, channel, values, remainder) {
	let commandResult = new MessageStack();

	commandResult.addPublicMessage(mWeather.getCurrentWeather(), nick, channel);

	return commandResult;
};

// push into commands array
module.exports.commands.push(weatherCommand);
