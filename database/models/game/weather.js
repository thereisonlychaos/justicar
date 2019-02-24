const mongoose = require('mongoose');

/**
* Weather
*/
const WeatherSchema = new mongoose.Schema({
	summary: { type: String, required: true },
	description: { type: String, required: true },
	season: {
		spring: { type: Boolean, default: true },
		summer: { type: Boolean, default: true },
		autumn: { type: Boolean, default: true },
		winter: { type: Boolean, default: true }
	},
	current: false
}, {timestamps: true});

mongoose.model("Weather", WeatherSchema);
