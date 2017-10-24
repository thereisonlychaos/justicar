const mongoose = require('mongoose');
const q = require('q');

const pools = module.exports.pools = {};


/**
* Any element on a character
* @class
*/
class CharacterElementModel {
	constructor(name) {
		if (name instanceof String) {
			this._name = name;
		} else {
			throw new Error("Invalid value for name in character element");
		}	
		this._help = null;

		this.canUpgradeAtCreation = false;
		this.creationCost = function(currentValue, futureValue) { return 0; }

		this.canUpgradeWithFreebie = false;
		this.freebieCost = function(currentValue, futureValue) { return 0; }

		this.canUpgradeWithXP = false;
		this.xpCost = function(currentValue, futureValue) { return 0; }
	}

	get name() {
		return this._name;
	}

	set name(val) {
		if (typeof(val) === 'String') this._name = val;
	}

	get help() {
		return this._help;
	}

	set help(value) {
		if (value instanceof String) {
			this._help = value;
		}
	}		
}

/**
* Model for a pool that goes up and down on a regular basis
*/
class PoolModel extends CharacterElementModel {
	constructor(name) {
		super(name);
		this._nMin = 0;
		this._fMin = function() { return this._nMin; };

		this._nMax = null;
		this._fMax = function() { return null };
		
		this._nStartingValue = 0;
		this._fStartingValue = function() { return null };
		
		this._nChangePerDay = null;
		this._fChangePerDay = function() { return null };

		this._nChangePerWeek = null;
		this._fChangePerWeek = function() { return null };

		this._nChangePerMonth = null;
		this._fChangePerMonth = function() { return null };
	}

	setByType(fieldName, value) {
		if (value instanceof Number) {
			this["_n" + fieldName] = value;
			this["_f" + fieldName] = function() { return q.when(this["_n" + fieldName]); }
		} else if (value instanceOf Function) {
			this["_n" + fieldName] = null;

			this["_f" + fieldName] = function() { return q.when(this["_n" + fieldName]); }
		} else {

		}
	}

	set StartingValue(value) {
		this.setbyType("StartingValue", value);
	}

	get StartingValue(...args) {
		return this._fStartingValue.apply(this, args);
	}

	set Min(value) {
		this.setbyType("Min", value);
	}

	get Min(...args) {
		return this._fMin.apply(this, args);
	}

	set Max(value) {
		this.setbyType("Max", value);
	}

	get Max(...args) {
		return this._fMax.apply(this, args);
	}

	set ChangePerDay (value) {
		this.setbyType("ChangePerDay", value);
	}

	get ChangePerDay (...args) {
		return this._fChangePerDay.apply(this, args);
	}

	set ChangePerMonth (value) {
		this.setbyType("ChangePerMonth", value);
	}

	get ChangePerMonth (...args) {
		return this._fChangePerMonth.apply(this, args);
	}
	
}