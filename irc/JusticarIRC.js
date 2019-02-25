const chalk = require('chalk');
var Bot = require('./classes/Bot');

let bot = new Bot();

module.exports.bot = bot;

let modules = {
	"channelManager": require("./modules/channelManager")
}

let commandHandlers = {};
commandHandlers["Dice"] = require('./commands/dice');

var commandDictionary = {};

console.log(chalk.green("\nInitializing IRC commands"));

for (var key in commandHandlers) {
	console.log(chalk.blue("\n== " + key + " Commands =="));

	if (!commandHandlers[key].commands) {
		console.log(chalk.yellow("WARNING:"), "Command Handler", key, "does not have a command object defined. It will not create any bot commands.")
	} else {
		// load command into dictionary
		let handler = commandHandlers[key];
		handler.commands.forEach(function(command) {
			if (commandDictionary[command.commandName]) {
				console.warn("Command", command.commandName, "is already defined.")
			} else {
				console.log(command.format, "-", chalk.grey(command.description));
				commandDictionary[command.commandName] = command;
			}
		})
		console.log("\n");
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
				bot.processMessageStack(stack, from, to);
			}).catch(
			function(err) {
				console.log("Error processing command", command, " : ", err);
			});
	}
}

/**
 * Initialize modules
 */

module.exports.initializeModules = function() {
	console.log(">>>Starting Modules<<<")
	for(let key in modules) {
		if(typeof modules[key].init === "function") {
			console.log("Initializing module:", key);
			modules[key].init();
		}
	}
}
