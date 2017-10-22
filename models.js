/**
* Mongoose Models
*
* @fileOverview This file creates all the models for the bot to use
*/
const mongoose = require('mongoose');
const validator = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require("crypto");

/**
* User
*/
var nameValidator = [
  validator({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validator({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
  })
];

const UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, unique: true, required: true, validate: nameValidator}
})

mongoose.model("User", UserSchema);

/**
* Channel
*/
const ChannelSchema = new mongoose.Schema({
	// name of the channel being used. The pound (#) is not necessary
	name: { type: String, required: true, unique: true },
	// description for the channel used on IRC
	description: { type: String, default: ""}
}, {timestamps: true});

ChannelSchema.plugin(uniqueValidator, {message: "already exists."});

mongoose.model("Channel", ChannelSchema);

/**
* Character
*/
const CharacterSchema = new mongoose.Schema({
	screenName: { type: String, required: true },
	npc: { type: Boolean, default: false },
	status: { type: String, enum: ['draft', 'active', 'returned']},
	description: { type: String, default: "They should really set a description."}
})

mongoose.model("Character", CharacterSchema);