const mongoose = require('mongoose');
const validators = require('mongoose-validator');
/**
* Channel
*/
const LogSchema = new mongoose.Schema({
	from: { type: String, required: true }, // message origin (nick)
	to: { type: String, required: true }, // message target (channel or nick)
	text: { type:String },
  type: { type: String, default: "message" }
}, {timestamps: true});

mongoose.model("Log", LogSchema);
