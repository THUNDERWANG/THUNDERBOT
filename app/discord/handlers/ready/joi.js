const Joi = require('joi');

// if validation fails, the returned object will have an error property

module.exports = () =>{
	// ensure the URL is from cube cobra/tutor
	Joi.validateCubeURL = function(url) {
		return Joi.string().regex(/^https?:\/\/(www.)?cube(cobra|tutor).com/i).uri().validate(url);
	};
};
