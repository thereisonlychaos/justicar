const q = require('q');
const chalk = require('chalk');
const mongoose = require('mongoose');

const JusticarIRC = require('../JusticarIRC');

let commandDictionary = {};

/******
 * Load in irc commands
 */

console.log(chalk.green("\nInitializing IRC commands"));


/**
 * Is this a command message?
 * @param strMessage
 * @returns {boolean}
 */
function isCommandMessage(strMessage) {
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

/**
 * Handle a command message (starting with !)
 */
function handleCommandMessage(from, to, message) {
    let command = message.split(" ", 1)[0];
    let messageAfterCommand = message.substring(command.length + 1);

    console.log("Command message received:", message);

    console.log("Command:", command);
    console.log("Parameters:", messageAfterCommand);

    if (commandDictionary.hasOwnProperty(command)) {

        commandDictionary[command].execute(from, to, messageAfterCommand).then(
            function(stack) {
                JusticarIRC.bot.processMessageStack(stack, from, to);
            }).catch(
            function(err) {
                console.log("Error processing command", command, " : ", err);
            });
    }
}

/**
 * Register commands of a command handler
 */
module.exports.registerCommands = function registerCommands(name, handler) {
    /**
     * This will reiterate over the commands in the command handler
     */
    console.log(chalk.blue("\n== " + name + " Commands =="));

    if (!commandHandler.commands) {
        console.log(chalk.yellow("WARNING:"), "Command Handler", name, "does not have a command object defined. It will not create any bot commands.")
    } else {
        // load command into dictionary
        handler.commands.forEach(function(command) {
            if (commandDictionary[command.commandName]) {
                console.warn("Command", command.commandName, "is already defined.")
            } else {
                console.log(command.format, "-", chalk.grey(command.description));
                commandDictionary[command.commandName] = command;
            }
        });

        // give another clean line to ouptu
        console.log("\n");
    }
};



/**
 * Initialize this module
 */
module.exports.init = function() {
    JusticarIRC.bot.client.addListener('message', function(from, to, text) {
        text.trim();
        if(isCommandMessage(text)) {
            handleCommandMessage(from, to, text);
        }
    });
};