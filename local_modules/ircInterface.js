var stringArgv = require('string-argv');


// using the apply() method, you can use the commandEnv as the 'this' value, allowing any command to reference that database connection involved

var commandEnv = {
	schemas: null,
	irc: null
};

module.exports.init = function(irc, schemas) {
	commandEnv.irc = irc;
	commandEnv.schemas = schemas;
}

module.exports.isCommand = function(strMessage) {
	if (typeof strMessage === 'string') {
		if(strMessage.slice(0,1) === "!") {
			return true;
		} else {
			return false;
		}
	} else {
		console.log("Non-string message passed into isCommand", strMessage);
		return false;
	}
}

module.exports.handleCommandMessage = function(message) {
	let args = stringArgv(message);
	console.log("Command message received:", message);

	let command = args[0];
	args.splice(0, 1);
	console.log("Command:", command);
	console.log("Args:", args);
}

