const mongoose = require('mongoose');
const validators = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require("crypto");
const Random = require('random-js');
const jwt = require('jsonwebtoken');

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
	email: {type: String, lowercase: true, unique: true, required: true, index: true, validate: validators({ validator: 'isEmail'}) },
	name: {type: String, default: ""},
	// login and password
	hash: String,
	salt: String,

	bio: String,
	activationCode: { type: String, default: Random.string()(mt, 24) },
	resetCode: { type: String },
	active: { type: Boolean, default: true },
	role: [{ type: ObjectId, ref: "RoleSchema" }],
	permissions: { // updated on delta of role
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
	},
	isSuperUser: { type: Boolean, default: false }
}, {timestamps: true})

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, hashIterations, hashLength, hashDigest).toString('hex');
}

UserSchema.methods.checkPassword = function(password) {
	let candidateHash = crypto.pbkdf2Sync(password, this.salt, hashIterations, hashLength, hashDigest).toString('hex');

	return this.hash === candidateHash;
}

UserSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expirationDate.getTime() / 1000)
	}, process.env.SECRET);
}

UserSchema.methods.getPermissions = function() {
	return this.permissions; // @TODO make this a real permissions call
}

UserSchema.methods.toAuthJSON = function() {
	return {
		_id: this._id,
		email:this.email,
		token: this.generateJWT(),
		permissions: this.getPermissions()
	}
}

mongoose.model("User", UserSchema);
