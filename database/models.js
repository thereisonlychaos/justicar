/**
* Mongoose Models
*
* @fileOverview This file creates all the models for the bot to use
*/
const mongoose = require('mongoose');
const validators = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require("crypto");
const Random = require('random-js');

const mt = Random.engines.mt19937();

// for quick assignment of object id fields
const ObjectId = mongoose.Schema.Types.ObjectId;

// Security settings
const 	hashIterations = 10000,
		hashLength = 512,
		hashDigest = "sha512"
;


/**
*
* IRC
*
**/


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

/**
*
* Game
*
**/


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

mongoose.model("Channel", ChannelSchema);



/**
*
* Character Management
*
**/


/**
* User
* Users for the website
*/
var nameValidator = [
  validators({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validators({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
  })
];

const UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, unique: true, required: true, index: true, validate: nameValidator },
	email: {type: String, lowercase: true, unique: true, required: true, index: true, validate: validators({ validator: 'isEmail'}) },
	
	// login and password
	hash: String,
	salt: String,

	bio: String,
	activationCode: { type: String, default: Random.string()(mt, 24) },
	resetCode: { type: String },
	active: { type: Boolean, default: true },
	role: { type: ObjectId, ref: "RoleSchema" },
	isSuperUser: { type: Boolean, default: false }
}, {timestamps: true})

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, hashIterations, hashLength, hashDigest);
}

UserSchema.methods.checkPassword = function(password) {
	let candidateHash = crypto.pbkdf2Sync(password, this.salt, hashIterations, hashLength, hashDigest);
	return this.has === candidateHash;
}

mongoose.model("User", UserSchema);

/**
* Role
* Roles define user access levels. The superuser boolean on a user overwrites everything, however
*/
const RoleSchema = new mongoose.Schema({
	name: {type: String, required: true},

	// access 
	adminAccess: { type: Boolean, default: false },

	// logs
	canReadLogs: {type: Boolean, default: false},
	canReadSecretLogs: {type: Boolean, default: false},

	// sheets
	canViewPlayerSheets: {type: Boolean, default: false },
	canViewNPCSheets: {type: Boolean, default: false },
	cansCreateCharacterSheets: {type: Boolean, default: false},
	canApproveCharacterSheets: {type: Boolean, default: false},
	canModifyCharacterSheets: {type: Boolean, default: false},

	// channels
	canCreateChannels: {type: Boolean, default: false },
	canModifyChannels: {type: Boolean, default: false}
	
}, {timestamps: true})

mongoose.model("Role", RoleSchema);


/**
* Character
*/
const CharacterSchema = new mongoose.Schema({
	_user: { type: ObjectId, ref: "User" },
	screenName: { type: String },
	realName: { type:String },
	npc: { type: Boolean, default: false },
	status: { type: String, enum: ['draft', 'active', 'rejected', 'dead', 'retired']},
})

mongoose.model("Character", CharacterSchema);

const PoolSchema = new mongoose.Schema({
	_type: { type: ObjectId, ref: "Character" },
	type: { type: String },
	current: { type: Number, default: 0 },
	max: { type: Number, default: 0 }
});

mongoose.model("Pool", PoolSchema);

