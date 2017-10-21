const q = require('q');

const irc = require('irc');
const ircColors = require('irc-colors');

const colorScheme = require('../colorscheme');
const MessageStack = require("./MessageStack");

/** Class representing a command that can be invoked in the bot */
class Command {
	/**
	* Create a command
	* @param {string} commandName - command used in IRC. Must start with !
	* @param {string} description - description used to tell users what the command does
	*/
	constructor(commandName, description) {
		this.allowedParameterTypes = ['Number', 'String'];

		if (commandName[0] === '!') {
			this._name = commandName;
			this._exec = function() { 
				console.log("Command function not set for ", this._name); 
				return true; 
			}

			this._description = description;
			this._parameters = [];
			this._validator = function() { return true; }
		} else {
			throw new Error("Command name must start with !")
		}
	}

	/**
	* getter for name
	*/
	get commandName() {
		return this._name;
	}

	/** 
	* setter for validator. The validator is checked to see if a command hsould be invoked. By default, just returns true
	*/
	set validator(newfunc) {
		if (typeof newfunc === 'function') {
			this._validator = newfunc;
		} else {
			throw new Error("Validator for a command must be a function.");
		}
	}

	/**
	* Add a parameter to the command
	* @param {string} name - name used in the key value pair when parsing the parameters
	* @param {string} [type="String"] - type of value the parameter will be compelled into. Either 'Number' or 'String'
	* @param {string} [description] - short description used in making format text
	* @param {function} [validator] - a function used to validate the value passed into the parameter.
	* @param {string} [example] - example value used in help text
	*/
	addParameter(name, type = "String", description = null, required = false, validator = null, example = null) {		
		if (this.allowedParameterTypes.indexOf(type) < 0) {
			throw new Error("Invalid type for parameter", name, ", type", type, "not supported");
		}

		if (example === null) {
			if (type === "String") {
				example = "foo";
			} else {
				example = "#";
			}
		}

		this._parameters.push({
			name: name,
			description: description,
			type: type,
			required: required,
			validator: validator, // both arguments and the function itself has a validator
			example: example
		})
	}


	get help() {
		let response = ""
		if (this._description) { 
			response = this._description; 
		}

		response += " - Usage: " + this.format;
		response += " - Ex: " + this.example;

		return response;
	}

	get format() {
		let response = this._name;

		this._parameters.forEach(
			function(param) {
				response += " (" + param.description + ")"
			}
		);

		return response;
	}

	get example() {
		let response = this._name;

		this._parameters.forEach(
			function(param) {
				response += " " + param.example;
			}
		);

		return response;
	}

	set commandFunction(newFunc) {
		if (typeof newFunc !== 'function') {
			throw new Error("Command function must be a function")
		} else {
			this._exec = newFunc;
		}
	}

	parseParameterValues(messageAfterCommand) {
		let result = {
			valid: true,
			errors: [],
			values: {},
			remainder: ""
		};

		let remainder = null;

		let unprocessedValues = messageAfterCommand.split(" ", this._parameters.length);

		this._parameters.forEach(function(parameter, index) {
			let passedValue = unprocessedValues.shift();
			let processedValue = null;
			let validationResult = null;

			let errors = [];

			if (passedValue) {
				if (parameter.type === "Number") {
					processedValue = Number.parseFloat(passedValue);

					if (isNaN(processedValue)) { 
						errors.push("invalid value");
						processedValue = null; 
					}
				} else if (parameter.type === "String") {
					processedValue = String(passedValue);
					if (processedValue.length <= 0) {
						errors.push("missing value");
						processedValue = null;
					}
				} else {
					errors.push("invalid type");
					console.log(chalk.red("Invalid type for parameter"), parameter.name, "set to", parameter.type);
					errors.push("invalid value");
					processedValue = null;
				}
			}

			// is validator if set and errors have not already shown
			if (typeof(parameter.validator) === 'function' && errors.length <= 0) {
				validationResult = parameter.validator(processedValue);
				
				if(typeof(validationResult) === 'string') {
					errors.push("validator failed");
					processedValue = null;
				}
			}

			// 

			if (parameter.required && errors.indexOf("invalid value") >= 0) {
				result.valid = false;
				if (parameter.description) {
					result.errors.push("Valid (" + parameter.description + ") required.")
				} else {
					result.errors.push("Valid (" + parameter.name + ") required.");
				}			
			}

			if (parameter.required && errors.indexOf("validator failed") >= 0) {
				result.valid = false;
				result.errors.push(validationResult);
			}

			result.values[parameter.name] = processedValue;

			
		});

		if (unprocessedValues.length > 0) {
			result.remainder = unprocessedValues.join(" ");
		}

		if (typeof(this._validator) === 'function' && result.errors.length <= 0) {
			let commandValidationResult = this._validator(result);
			if(typeof(commandValidationResult) === 'string') {
				result.errors.push(commandValidationResult);
			}
		}

		return result;
	}

	execute(from, to, messageAfterCommand) {
		let parameters = this.parseParameterValues(messageAfterCommand);
		console.log("parsed parameter values:", parameters);

		if(parameters.valid) {
			return q.fcall(this._exec, from, to, parameters.values);
		} else {
			let errorStack = new MessageStack();

			let errorMessage = this.commandName + ": ";
			errorMessage += parameters.errors.join(" ");
			errorMessage += " Try: " + this.format + "  Ex: " + this.example;

			errorMessage = irc.colors.wrap(colorScheme.messageError, errorMessage);

			errorStack.addPublicMessage(errorMessage);

			return q.fcall(function() { return errorStack; });
		}

	}
}

module.exports = Command;