const chalk = require('chalk');
const q = require('q');
const JusticarIRC = require('../JusticarIRC');

class Bot {
	constructor() {
		this._client = null;
		this.staffChannel = null;
	}

	set client(newClient) {
		let thisBot = this;
		this._client = newClient;

		this._client.addListener('connect', function() {
			console.log("\n", chalk.bold.yellow(">>> Justicar is attempting to connect <<<"), "\n");
		});

		this._client.addListener('registered', function(message) {
			console.log(chalk.bold.green(">>> Justicar has connected to", message.server, "<<<"), "\n");
			thisBot._client.send("OPER", JusticarIRC.config.irc.oper.name, JusticarIRC.config.irc.oper.password);
			JusticarIRC.initializeModules();
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
		let myClient = this._client;
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

	joinChannel(channelName) {
		let deferred = q.defer();

		this._client.join(channelName, function() {
			deferred.resolve();
		});

		return deferred.promise;
	}

	createChannel(channel) {
		let thisBot = this;
		console.log("Creating channel #", channel.name);
		this.joinChannel("#" + channel.name).then(
			function() {
				thisBot._client.send("samode", "#"+channel.name, "+o", thisBot._client.nick);
				thisBot._client.send("topic", "#"+channel.name, channel.description);
				if (channel.secret) {
					thisBot._client.send("mode", "#"+channel.name, "+s");
					thisBot.opUser(channel.name, JusticarIRC.config.irc.nick);
				}
			}
		).catch(
			function(err) {
				console.log("ERROR:", err);
			}
		)
	}

	setTopic(channel, topic) {
      let thisBot = this;
	}

	opUser(channel, nickname) {
		this._client.send("MODE", "#"+channel.name, "+o", nickname);
	}
}

module.exports = Bot;
