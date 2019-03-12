const q = require('q');
const chalk = require('chalk');
const mongoose = require('mongoose');

const JusticarIRC = require('../JusticarIRC');
const Channel = mongoose.model('Channel');

let mChannels = {};

mChannels.getChannels = function() {
  let deferred = q.defer();

  Channel.find({}, function(err, results) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(results);
    }
  });

  return deferred.promise;
};

mChannels.setupChannels = function() {
    mChannels.getChannels().then(
        function(channels) {
          channels.forEach(
            function(channel) {
              JusticarIRC.bot.createChannel(channel);
            }
          );
        }
  ).catch(
    function(err) {
      console.log("ERROR:", err);
    }
  )
};

mChannels.init = function() {
    mChannels.setupChannels();
};

module.exports = mChannels;
