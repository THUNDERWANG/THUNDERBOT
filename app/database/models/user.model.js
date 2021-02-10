const mongoose = require('mongoose');
const Joi = require('joi');

const cubesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		max: 2000,
		validate: {
			validator: async function(value) {
				const { error } = Joi.validateCubeURL(value);
				if (error) return Promise.resolve(false);
				return Promise.resolve(true);
			},
			message: 'cube url is not valid!',
		},
	},
});

const userSchema = new mongoose.Schema({
	discordId: {
		type: String,
		required: true,
		unique: true,
	},
	discordTag: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
		trim: true,
	},
	points: {
		type: Number,
		default: 0,
		min: 0,
		validate: {
			validator: async function(value) {
				if (!Number.isInteger && value < 0) await Promise.resolve(false);
				await Promise.resolve(true);
			},
			message: 'points must an int >= 0',
		},
	},
	cubes: {
		type: [cubesSchema],
	},
});

const User = mongoose.model('User', userSchema);

User.findUserAndUpdate = async function(discordId, payload) {
	const query = { discordId };
	return await User.findOneAndUpdate(query, payload, { upsert: true, returnOriginal: false, runValidators: true });
};

User.findUser = async function(discordId) {
	return await User.findOne({ discordId });
};

module.exports = User;