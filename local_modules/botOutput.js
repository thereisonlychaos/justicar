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


	processMessageStack(stack, from, to) {
		let myClient = this.client;
		stack.messages.forEach(function(stackMessage) {
			let targetNick = stackMessage.nick || from;
			let targetChannel = stackMessage.channel || to;

			console.log("channel:", targetChannel, ", nick:", targetNick);

			switch(stackMessage.type) {
				case "Private":					
					myClient.say(targetNick, stackMessage.message);
					break;
				case "Notice":
					myClient.notice(targetNick, stackMessage.message);
					break;
				case "Public":
					if (stackMessage.channel) {
						myClient.say(targetChannel, stackMessage.message);
					} else {
						myClient.say(targetNick, stackMessage.message);
					}
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