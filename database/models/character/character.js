const mongoose = require('mongoose');

/**
* Character
*/
const CharacterSchema = new mongoose.Schema({
	_user: { type:  mongoose.Schema.Types.ObjectId, ref: "User" },
	screenName: { type: String },
	realName: { type:String },
	npc: { type: Boolean, default: false },
	status: { type: String, enum: ['draft', 'active', 'rejected', 'dead', 'retired']},
})

mongoose.model("Character", CharacterSchema);
