const q = require('q');
const chalk = require('chalk');
const mongoose = require('mongoose');

const JusticarIRC = require('../JusticarIRC');
const Log = mongoose.model('Log');

function log(from, to, text, type) {
  let record = new Log({
    from,
    to,
    text,
    type
  });

  record.save(
    (err, saved_record) => {
      if (err) console.error("Error saving log:", saved_record);
      console.log(chalk.gray("[", type, "]", from, "->", to, ":", text));
    }
  )
}

module.exports.init = function() {
  JusticarIRC.bot._client.addListener('message', function(from, to, text) {
  	text.trim();
  	log(from, to, text, 'message');
  });

  JusticarIRC.bot._client.addListener('action', function(from, to, text) {
  	text.trim();
  	log(from, to, text, 'action');
  });

  JusticarIRC.bot._client.addListener('part', function(channel, nick, text) {
  	text.trim();
  	log(nick, channel, text, 'part');
  });

  JusticarIRC.bot._client.addListener('join', function(channel, nick) {
  	log(nick, channel, "joined", 'join');
  });
};
