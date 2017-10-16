const chalk = require('chalk');
const botOutput = require('./botOutput');

// modules

let commandHandlers = {};
commandHandlers["Dice"] = require('./commandsDice');

var client = null;
var schemas = null;
var botOut = null;
var config = {};

var commandDictionary = {};

module.exports.init = function(c, s, newConfig) {
	console.log(chalk.blue("Initializing commands"));
	config = newConfig;
	client = c;
	schemas = s;
	botOut = new botOutput(client, config.chat.staffChannel);


	for (var key in commandHandlers) {
		// does the command handler have a proper command object? If not, warning.
		if (!commandHandlers[key].init) {
			console.log(chalk.yellow("WARNING:"), "Command Handler", key, "does not init function defined. Will not have replier or schemas set properly.")
		} else {
			commandHandlers[key].init(schemas);
		}

		if (!commandHandlers[key].commands) {
			console.log(chalk.yellow("WARNING:"), "Command Handler", key, "does not have a command object defined. It will not create any bot commands.")
		} else {
			// load command into dictionary
			let handler = commandHandlers[key];
			for (var command in handler.commands) {
				let commandName = command.commandName;
				if (commandDictionary[commandName]) {
					console.warn("Command", command, "is already defined.")
				} else {					
					console.log(commandName, "command created");
					commandDictionary[commandName] = command;
				}
			}
		}
	}
}

module.exports.isCommandMessage = function(strMessage) {
	if (typeof strMessage === 'string') {
		if(strMessage.slice(0,1) === "!") {
			return true;
		} else {
			return false;
		}
	} else {
		console.log("Non-string message passed into isCommand:", strMessage);
		return false;
	}
}

module.exports.handleCommandMessage = function(from, to, message) {
	let command = message.split(" ", 1)[0];
	let messageAfterCommand = message.substring(command.length + 1)

	console.log("Command message received:", message);

	console.log("Command:", command);
	console.log("Parameters:", messageAfterCommand);

	if (commandDictionary.hasOwnProperty(command) && IsCommandValid(commandDictionary[command].params, from, to, args)) {
		commandDictionary[command].func.apply({}, [from, to].concat(args));
	}
}

