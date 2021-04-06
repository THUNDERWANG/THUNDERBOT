const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');

module.exports = class DataCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'data',
      group: 'members',
      memberName: 'data',
      description: 'Retrieve the 3-0 data url',
      examples: ['.data'],
      throttling: { usages: 1, duration: 3 },
    });
  }

  async run(message) {
    try {
      await message.say(':microscope: http://data.cube.pizza :microscope:');
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
