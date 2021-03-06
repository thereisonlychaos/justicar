const q = require('q');
const chalk = require('chalk');
const c = require('irc-colors');
const schedule = require('node-schedule');

const randomJs = require('random-js');
const engine = randomJs.engines.mt19937();
engine.autoSeed();


const colorScheme = require('../settings/colorscheme');

const mongoose = require('mongoose');

const MessageStack = require('../classes/MessageStack');

const JusticarIRC = require('../JusticarIRC');
const mChannelManager = require("./channels");

const Weather = mongoose.model('Weather');

let mWeather = {};

/**
 * Get current season based on northern hemisphere, using the keys in the Weather schema for season (lowercase)
 * @returns {string}
 */

function getCurrentSeason() {
    let today = new Date();
    let currentMonth = today.getMonth() + 1; // remember 0 is January

    let response = "winter";
    /*
    We generate the season being used by using the meteorological seasons
      Winter (December [12] - February [2])
      Spring (March [3] - May [5])
      Summer (June [6] - August [8])
      Autumn (September [9] - November [11])
     */

    if (currentMonth >= 12 || currentMonth <= 2) {
        response = "winter";
    } else if (currentMonth >= 3 && currentMonth <= 5) {
        response = "spring";
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        response = "summer";
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        response = "autumn";
    }

    return response;
}

/**
 * Get conditions for selecting valid weather
 */
function getWeatherQuery() {
    let conditions = {};
    conditions["season." + getCurrentSeason()] = true;

    return conditions;
}

/**
 * Current selected weather
 * @type {string}
 */
mWeather.currentWeather = c.lightgray("[Weather Not Available]");

/**
 * Get current weather from database, set with current flag in Weather schema, and then set it as the current weather
 */
mWeather.retrieveWeatherFromDb = function() {
    let conditions = getWeatherQuery();
    conditions.current = true;

    Weather.findOne(conditions, (err, record) => {
        if (err) {
            console.error(err);
            throw new Error(err);
        } else {
            if (record) {
                this.setWeather(record.summary, record.description);
            } else {
                this.clearWeather();
            }
        }
    });
};

/**
 * Set weather variable in module
 * @param {string} summary
 * @param {string} weatherDescription
 */
mWeather.setWeather = function(summary, weatherDescription) {
    this.currentWeather = c.bold("Weather: " + summary + ".") + " " + c.gray(weatherDescription);
    console.log(chalk.black.bgWhite("Weather:"), c.stripColorsAndStyle(this.currentWeather));

    let messages = new MessageStack();

    mChannelManager.getChannels().then(
      (channels) => {
        channels.forEach(
          (channel) => {
            messages.addPublicMessage(this.getCurrentWeather(), null, "#" + channel.name);
          }
        );

        JusticarIRC.bot.processMessageStack(messages);
      }
    ).catch(
      (err) => {
        console.error(chalk.red(err));
      }
    )
};

/**
 * Set all weather current to false
 */
mWeather.clearWeather = function() {
    let deferred = q.defer();

    Weather.update({ current: true }, { current: false }, {multi: true}, (err, raw) => {
       if (err) {
           deferred.reject(err);
       } else {
           this.currentWeather = c.lightgray("[Weather Not Available]");
           deferred.resolve();
       }
    });

    return deferred.promise;
};

/**
 * Change weather to a random season-appropriate weather description
 */
mWeather.randomWeatherChange = function() {
    Weather.find(getWeatherQuery(), (err, records) => {
        if (records.length > 0) {
            mWeather.clearWeather().then(
                (result) => {
                    let randomSkip = Math.floor(records.length * Math.random());

                    records[randomSkip].current = true;
                    records[randomSkip].save(
                        (err, record) => {
                            mWeather.setWeather(record.summary, record.description);
                        }
                    );
                }
            ).catch(
                (err) => {
                    console.error("Error randomly changing weather:", err);
                }
            )
        } else {
            mWeather.clearWeather();
        }
    });
};

/**
 * Get current weather string with IRC adornment
 * @returns {string}
 */
mWeather.getCurrentWeather = function() {
    return this.currentWeather;
};

// listener for weather change via API
JusticarIRC.events.addListener("api_weather_update",
  (updatedWeather) => {
    if(updatedWeather.current) {
      mWeather.setWeather(updatedWeather.summary, updatedWeather.description);
    }
  }
);

// regular job to change weather
let weatherChangeJob = schedule.scheduleJob('2,12,28,48 * * * *', ()=> {
  /**
   * Odds of the weather changing, 1 in X
   */
  let oddsOfChange = 28;

  /**
   * Generate boolean
   */
  let bChangeWeather = randomJs.bool(1, oddsOfChange)(engine);
  if(bChangeWeather) {
    console.log(chalk.blue("Changing weather at random..."));
    mWeather.randomWeatherChange();
  };
});

/**
 * Initialize module
 */
mWeather.init = function() {
  this.retrieveWeatherFromDb();

  // Listen for joins by anyone but the bot and message them the weather
  JusticarIRC.bot.client.addListener('join', (channel, nick) => {
    // @TODO check to see if channel is in-character or not
    if(nick !== JusticarIRC.bot.client.nick) {
      messages = new MessageStack();

      messages.addNoticeMessage(this.getCurrentWeather(), nick, channel)

      JusticarIRC.bot.processMessageStack(messages);
    }
  });
};

module.exports = mWeather;
