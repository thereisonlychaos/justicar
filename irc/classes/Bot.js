const chalk = require('chalk');
const JusticarIRC = require('../JusticarIRC');

class Bot {
	constructor() {
		this._client = null;
		this.staffChannel = null;
	}

	set client(newClient) {
		this._client = newClient;

		this._client.addListener('connect', function() {
			console.log("\n", chalk.bold.green(">>> Justicar is online <<<"), "\n");
		});

		this._client.addListener('message', function(from, to, message) {
			message.trim();
			if (JusticarIRC.isCommandMessage(message)) {
				JusticarIRC.handleCommandMessage(from, to, message);
			}
		});

		this._client.addListener('error', function(message) {
			console.log("\n", chalk.bold.red("IRC Error:"), message, "\n");
		});
	}

	get client() {
		return this._client;
	}

	connect() {
		if(this._client) {
			console.log(chalk.yellow("\nAttempting IRC connection to", this._client.opt.server, "with nick", this._client.opt.nick));
			this._client.connect();
		} else {
			console.log(chalk.red('IRC client not set for bot. Cannot connect.'))
		}
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

module.exports = Bot;
