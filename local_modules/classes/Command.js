const q = require('q');

const irc = require('irc');
const ircColors = require('irc-colors');

const colorScheme = require('../colorscheme');
const MessageStack = require("./MessageStack");

const ERRORS = {
	ERR_MISSING_VALUE: 1,
	ERR_INVALID_VALUE: 2,
	ERR_INVALID_TYPE: 3

}

/** Class representing a command that can be invoked in the bot */
class Command {
	/**
	* Create a command
	* @param {string} commandName - command used in IRC. Must start with !
	* @param {string} description - description used to tell users what the command does, cropped to 20 characters for sanity's sake
	*/
	constructor(commandName, description) {
		this.allowedParameterTypes = ['Number', 'String'];

		// first letter of command name must be a '!', this allows for quick assessment of messages for what is commands or not without doing full string comparisons
		if (commandName[0] === '!') {
			this._name = commandName;
			this._exec = function() { 
				console.log("Command function not set for ", this._name); 
				return true; 
			}
			// short description (one to two words)
			this._description = description.substring(0, 20);
			this._parameters = [];
			this._validator = function() { return true; }
			this._remainderDescription = null;
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
		// only allow functions to be set for validator
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
	* @param {number} [position] - what position to put the parameter at, overwriting the current parameter in that position. If left out, adds to the end of the parameters
	*/
	addParameter(name, type = "String", description = null, required = false, validator = null, example = null, position = null) {

		let targetPosition = Number.parseInt(position);

		// parameters must be within the parameter types settings
		if (this.allowedParameterTypes.indexOf(type) < 0) {
			throw new Error("Invalid type for parameter", name, ", type", type, "not supported");
		}

		// add default description based on parameter type if description is not provided
		if (example === null) {
			if (type === "String") {
				example = name;
			} else {
				example = "#";
			}
		}

		// generate parameter object
		let generatedParameter = {
			name: name,
			description: description,
			type: type,
			required: required,
			validator: validator, // both arguments and the function itself has a validator
			example: example
		}

		// Add parameter to array that will be looped through to process command

		// if position was provided and valid, overwrite target
		if (!isNaN(targetPosition) && targetPosition >= 0) {
			this._parameters[targetPosition] = generatedParameter;
		} else {
			this._parameters.push(generatedParameter)
		}
		
	}

	/**
	* Set description for unparamaterized parts of the command remaining, to use in help and example text
	* @param {string} desc - description of remainder
	*/
	set remainderDescription(desc) {
		this._remainderDescription = String(desc);
	}

	/**
	* Get help text for this command, showing the description, usage format and an example generated from example values automatically.
	*/
	get help() {
		let response = ""
		if (this._description) { 
			response = this._description; 
		}

		response += " - Usage: " + this.format;
		response += " - Ex: " + this.example;

		return response;
	}

	/**
	* Get format of command generated from parameter settings
	*/
	get format() {
		// start with command name
		let response = this._name;

		// loop through parameters to add description
		this._parameters.forEach(
			function(param) {
				response += " (" + param.description + ")"
			}
		);

		// add remainder description with slightly different symbols
		if (this._remainderDescription) response += " [" + this._remainderDescription + "]"

		return response;
	}

	/**
	* Get example of command being used from parameter settings. Uses generic ugly values if examples aren't set for each parameter.
	*/
	get example() {
		let response = this._name;

		this._parameters.forEach(
			function(param) {
				response += " " + param.example;
			}
		);

		if (this._remainderDescription) response += " " + this._remainderDescription + ""

		return response;
	}

	/** Set command function that will be executed
	* @param {function} newFunc - function to be added
	*/
	set commandFunction(newFunc) {
		/// validate new value or throw error
		if (typeof newFunc !== 'function') {
			throw new Error("Command function must be a function")
		} else {
			this._exec = newFunc;
		}
	}

	/**
	* Use the parameters to parse the values passed in after the command
	* @param {string} messageAfterCommand - trimmed string of message after command (e.g. !roll <messageAfterCommand>)
	* @returns {object} - result object
	*/
	parseParameterValues(messageAfterCommand) {
		// initalize result form
		let result = {
			valid: true,
			errors: [],
			values: {},
			remainder: ""
		};

		// create array of unprocessed values
		let unprocessedValues = messageAfterCommand.split(" ").filter(value => value !== '');

		// For each parameter set, shift out a value from the unprocessedValue array. Validate and process it.
		this._parameters.forEach(function(parameter, index) {
			
			let passedValue = unprocessedValues.shift();
			let processedValue = null;
			let validationResult = null;

			let errors = [];

			if (passedValue) {
				if (parameter.type === "Number") {
					processedValue = Number.parseFloat(passedValue);

					if (isNaN(processedValue)) { 
						errors.push(ERRORS.ERR_INVALID_VALUE);
						processedValue = null; 
					}
				} else if (parameter.type === "String") {
					processedValue = String(passedValue);
					if (processedValue.length <= 0) {
						errors.push(ERRORS.ERR_MISSING_VALUE);
						processedValue = null;
					}
				} else {
					errors.push(ERRORS.ERR_INVALID_TYPE);
					console.log(chalk.red("Invalid type for parameter"), parameter.name, "set to", parameter.type);
					errors.push(ERRORS.ERR_INVALID_VALUE);
					processedValue = null;
				}
			} else {
				errors.push(ERRORS.ERR_MISSING_VALUE);
				processedValue = null;
			}

			if (parameter.required && errors.indexOf(ERRORS.ERR_INVALID_VALUE) >= 0) {
				result.valid = false;
				if (parameter.description) {
					result.errors.push("Invalid (" + parameter.description + ")")
				} else {
					result.errors.push("Invalid (" + parameter.name + ")");
				}			
			}

			if (parameter.required && errors.indexOf(ERRORS.ERR_MISSING_VALUE) >= 0) {
				result.valid = false;
				if (parameter.description) {
					result.errors.push("Missing (" + parameter.description + ")")
				} else {
					result.errors.push("Missing (" + parameter.name + ")");
				}			
			}

			// is validator if set and errors have not already shown
			if (typeof(parameter.validator) === 'function' && errors.length <= 0) {
				validationResult = parameter.validator(processedValue);
				
				if(typeof(validationResult) === 'string') {
					errors.push("validator failed");
					processedValue = null;
				}

				if(validationResult === false) {
					errors.push("validator failed");
					if (parameter.description) {
						validationResult = "Invalid (" + parameter.description + ")";
					} else {
						validationResult = "Invalid (" + parameter.name + ")";
					}	
					processedValue = null;
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

	/**
	* Attempt to execute this command. If parameters are invalid, send help text
	* @param {string} from - nick of user
	* @param {string} to - channel or nick this message was sent to
	* @param {string} messageAfterCommand - the message after the command statement, e.g. !roll <messageAftercCommand
	* @returns {Q.Promise}
	*/
	execute(from, to, messageAfterCommand) {
		let parameters = this.parseParameterValues(messageAfterCommand);

		if(parameters.valid) {
			return q.fcall(this._exec, from, to, parameters.values, parameters.remainder);
		} else {
			let errorStack = new MessageStack();

			let errorMessage = this.commandName + ": ";
			errorMessage += parameters.errors.join(", ");
			errorMessage += ". Try: " + this.format + "  Ex: " + this.example;

			errorMessage = irc.colors.wrap(colorScheme.messageError, errorMessage);

			errorStack.addPublicMessage(errorMessage, from, to);

			return q.fcall(function() { return errorStack; });
		}

	}
}

module.exports = Command;