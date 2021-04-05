const mongoose = require('mongoose');
const { validateCubeURL } = require('@helpers/helpers.js');

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
      async validator(value) {
        return validateCubeURL(value);
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
      async validator(value) {
        return !(Number.isInteger && value < 0);
      },
      message: 'points must an int >= 0',
    },
  },
  cubes: {
    type: [cubesSchema],
  },
});

const User = mongoose.model('User', userSchema);

User.findUserAndUpdate = (discordId, payload) => User.findOneAndUpdate({ discordId }, payload, { upsert: true, returnOriginal: false, runValidators: true });

User.findUser = (discordId) => User.findOne({ discordId });

User.findPoints = async (discordId) => {
  const user = await User.findUser(discordId);
  return user ? user.points : null;
};

User.levelUp = async (discordId, discordTag = null) => {
  const payload = { $set: { discordTag }, $inc: { points: 1 } };
  const user = await User.findUserAndUpdate(discordId, payload); // upsert
  return user.points;
};

module.exports = User;
