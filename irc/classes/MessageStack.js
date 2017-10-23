/**
 * Class for the results of commands
 */

class MessageStack {
	/**
	* Create a command result
	*/
	constructor() {
	 	this._messages = [];
	}

	get messages() {
		return this._messages;
	}

	/**
	* Add message that will be sent privately by the bot to the target user. If nick is not provided, sent to user that invoked command
	* @param {string} message - IRC message
	* @param {string} [nick] - Nick to send message to
	*/
	addPrivateMessage(message, nick = null) {
	 	this._messages.push({
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
	 	this._messages.push({
	 		type: "Notice",
	 		nick: nick,
	 		message: message
	 	});
	}

	/**
	* Add message to be sent to the channel for everyone to see
	* @param {string} message - IRC message
	* @param {string} [nick] - nick to send message if channel is null
	* @param {string} [channel] - channel to send message
	*/
	addPublicMessage(message, nick = null, channel = null) {
		if (String(channel).substring(0, 1) !== "#") channel = null;

	 	this._messages.push({
	 		type: "Public",
	 		nick: channel,
	 		channel: channel,
	 		message: message
	 	});
	}

	/**
	* Add message to be sent to the staff channels
	* @param {string} message - mesage to send to staff
	*/
	addStaffMessage(message) {
	 	this._messages.push({
	 		type: "Staff",
	 		message: message
	 	});
	}
}

module.exports = MessageStack;