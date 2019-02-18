const mongoose = require('mongoose');

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
