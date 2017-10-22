var chalk = require('chalk');

class botOutput {
	constructor() {
		this.client = null;
		this.staffChannel = null;
	}

	processMessageStack(stack, from, to) {
		let myClient = this.client;
		stack.messages.forEach(function(stackMessage) {
			let targetNick = stackMessage.nick || from;
			let targetChannel = stackMessage.channel || to;

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

module.exports = new botOutput();