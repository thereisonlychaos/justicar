module.exports.getConfig = function() {
  let config = {};

  if(process.env.NODE_ENV === 'development') {
  	config = require('./dev.json');
  } else {
  	config = require('./production.json');
  }

  return config;
};
