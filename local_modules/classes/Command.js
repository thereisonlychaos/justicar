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
			if (type === "string") {
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
		if (this.description) { 
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
			throw new Error("Command function must equal ")
		} else {
			this._exec = newFunc;
		}
	}

	parseParameterValues(messageAfterCommand) {
		let result = {
			valid: true,
			values: {}
		};

		let remainder = null;

		let unprasedParameters = messageAfterCommand.split(" ", this._parameters.length);

		this._parameters.forEach(function(parameter, index) {
			let processedValue = null;

			if (values[index]) {
				if (parameter.type === "Number") {
					processedValue = Number.parseFloat(values[index]);

					if (isNaN(processedValue)) { processedValue = null; }
				} else if (parameter.type === "String") {
					processedValue = String(values[index])
				} else {
					throw new Error("Invalid parameter type");
				}
			}

			processedParameterValues.values[parameter.name] = result;
			if (parameter.required === true && result === null) {
				processedParameterValues.valid = false
			}
		})

		if (values.length > this._parameters.length) {

		}

		return result;
	}

	execute(from, to, messageAfterCommand) {

	}
}

module.exports = Command;