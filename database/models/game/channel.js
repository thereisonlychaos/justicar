const mongoose = require('mongoose');
const validators = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

/**
* Channel
*/
const ChannelSchema = new mongoose.Schema({
	// name of the channel being used. The pound (#) is not necessary
	name: { type: String, required: true, unique: true },
	// description for the channel used on IRC
	description: { type: String, default: ""},
	// is it secret? is it safe?
	secret: { type: Boolean, default: false },
	// tags for various effects, such as 'indoor', 'ooc', etc.
	tags: [{type:String}]

}, {timestamps: true});

ChannelSchema.plugin(uniqueValidator, {message: "already exists."});

mongoose.model("Channel", ChannelSchema);
