var chalk = require('chalk');

class botOutput {
	constructor(ircClient, staffChannel = null) {
		if (ircClient) {
			this.client = ircClient;
			this.staffChannel = staffChannel;
		} else {
			console.log("ERROR: IRC client must be defined for ircOutput class");
			throw new Error("IRC client must be defined for ircOutput class");
		}
	}

	processMessageStack(stack, defaultNick, defaultChannel) {
		let myClient = this.client;
		stack.messages.forEach(function(stackMessage) {
			let targetNick = stackMessage.nick || defaultNick;
			let targetChannel = stackMessage.channel || defaultChannel;

			switch(stackMessage.type) {
				case "Private":					
					myClient.say(targetNick, stackMessage.message);
					break;
				case "Notice":
					myClient.notice(targetNick, stackMessage.message);
					break;
				case "Public":
					myClient.say(targetChannel, stackMessage.message);
					break;
				case "Staff":
					if (staffChannel) {
						myClient.say(staffChannel, stackMessage.message);
					} else {
						console.log(chalk.yellow("NO STAFF CHANNEL DEFINED. STAFF MESSAGE IGNORED:", stackMessage.message));
					}
					break;
				default:
					console.log(chalk.red("INVALID MESSAGE TYPE - ", stackMessage.type, " ON MESSAGE:", stackMessage.message))
			}
		})
	}

}

module.exports = botOutput;