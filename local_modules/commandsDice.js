var dice = require("./dice");

/**
* Rolls dice and returns an IRC string to output
* 
*/
function commandRoll(nick, channel, numberOfDice, difficulty) {
	let messageTarget = channel[0] === "#" ? channel : nick;

	this.replier.replyToCommand(nick, channel, nick + " rolled " + numberOfDice + " in " + channel + " @ diff " + difficulty);
}

module.exports.commands = {
	"!roll": commandRoll
}