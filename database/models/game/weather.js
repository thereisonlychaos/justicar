const mongoose = require('mongoose');

/**
* Weather
*/
const WeatherSchema = new mongoose.Schema({
	description: { type: String, required: true },
	season: {
		autumn: { type: Boolean, default: true },
		spring: { type: Boolean, default: true },
		summer: { type: Boolean, default: true },
		winter: { type: Boolean, default: true }
	}
}, {timestamps: true});

mongoose.model("Weather", WeatherSchema);
