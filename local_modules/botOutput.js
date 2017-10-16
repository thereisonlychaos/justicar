var chalk = require('chalk');

class botOutput {
	constructor(ircClient, staffChannel = null) {
		if (ircClient) {
			this.client = ircClient;
			this.staffChannel = staffChannel;
		} else {
			throw new Error("IRC client must be defined for ircOutput class");
		}
	}

	processMessageStack(stack, defaultNick, defaultChannel) {
		stack.messages.forEach(function(stackMessage) {
			let targetNick = stackMessage.nick || defaultNick;
			let targetChannel = stackMessage.channel || defaultChannel;

			switch(stackMessage.type) {
				case "Private":					
					this.client.say(targetNick, stackMessage.message);
					break;
				case "Notice":
					this.client.notice(targetNick, stackMessage.message);
					break;
				case "Public":
					this.cllient.say(targetChannel, stackMessage.message);
					break;
				case "Staff":
					if (staffChannel) {
						this.client.say(staffChannel, stackMessage.message);
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