module.exports = function(ircClient) {
	var replierObj = {
		ircClient: ircClient
	};

	function getReplyTarget(nick, channel) {
		if (channel[0] === "#") {
			return channel;
		} else {
			return nick;
		}
	}

	replierObj.replyToCommand = function(nick, channel, msg) {
		this.ircClient.say(getReplyTarget(nick, channel), msg);
	}

	return replierObj;
}