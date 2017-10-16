/**
 * Class for the results of commands
 */

class MessageStack {
	/**
	* Create a command result
	*/
	constructor() {
	 	this.messages = [];
	}

	/**
	* Add message that will be sent privately by the bot to the target user. If nick is not provided, sent to user that invoked command
	* @param {string} message - IRC message
	* @param {string} [nick] - Nick to send message to
	*/
	addPrivateMessage(message, nick = null) {
	 	this.messages.push({
	 		type: "Private",
	 		nick: nick,
	 		message: message
	 	});
	 }
	/**
	* Add message to be sent as a notice. Defaults to nick and channel that invoked command
	* @param {string} message - IRC message
	* @param {string} [nick] - nick to send message to
	* @param {string} [channel] - channel to send message in
	*/
	addNoticeMessage(message, nick = null, channel = null) {
	 	this.messages.push({
	 		type: "Notice",
	 		nick: nick,
	 		message: message
	 	});
	}

	/**
	* Add message to be sent to the channel for everyone to see
	* @param {string} message - IRC message
	* @param {string} [channel] - channel to send message
	*/
	addPublicMessage(message, channel = null) {
	 	this.messages.push({
	 		type: "Public",
	 		channel: channel,
	 		message: message
	 	});
	}

	/**
	* Add message to be sent to the staff channels
	* @param {string} message - mesage to send to staff
	*/
	addStaffMessage(message) {
	 	this.messages.push({
	 		type: "Staff",
	 		message: message
	 	});
	}

	/**
	* Send out messages in stack
	* @param {object} ircClient - nodejs irc client
	* @param {string} defaultNick - nick to default to if it is undefined
	*/
	sendAll(replier, defaultNick, defaultChannel, staffChannel) {

	}
}

module.exports = MessageStack;