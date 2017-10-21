const chalk = require('chalk');
const botOutput = require('./botOutput');

// modules

let commandHandlers = {};
commandHandlers["Dice"] = require('./commandsDice');

var schemas = null;
var botOut = null;
var config = {};

var commandDictionary = {};

module.exports.init = function(c, s, newConfig) {
	console.log(chalk.blue("Initializing commands"));
	config = newConfig;
	botOut = new botOutput(c, config.chat.staffChannel);


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
			handler.commands.forEach(function(command) {
				if (commandDictionary[command.commandName]) {
					console.warn("Command", command.commandName, "is already defined.")
				} else {					
					console.log(command.commandName, "command created");
					commandDictionary[command.commandName] = command;
				}
			})
		}
	}
}

module.exports.isCommandMessage = function(strMessage) {
	strMessage.trim();
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

	if (commandDictionary.hasOwnProperty(command)) {

		commandDictionary[command].execute(from, to, messageAfterCommand).then(
			function(stack) {
				botOut.processMessageStack(stack, from, to);
			}).catch(
			function(err) {
				console.log("Error processing command", command, " : ", err);
			});
	}
}

