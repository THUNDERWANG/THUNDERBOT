// const Commando = require('discord.js-commando');
// const logger = require('@logger/logger.js');
// const { triceRole, xmageRole, draftPlanningChannel } = require('config').discord;

// module.exports = class DrafterCommand extends Commando.Command {
//   constructor(client) {
//     super(client, {
//       name: 'assemble the legion!',
//       group: 'members',
//       patterns: [/^<@&/i, /^@xmage/i, /^@trice/i, /^@cock/i, /^@cockatrice/i],
//       guildOnly: true,
//       argsCount: 1,
//       argsType: 'single',
//       memberName: 'assemble',
//       description: 'Type in @xmage or @cockatrice.',
//       throttling: { usages: 1, duration: 600 },
//     });
//   }

//   async run(message) {
//     const content = message.content.trim().toLowerCase().split(' ')[0];
//     try {
//       if (message.channel.id === draftPlanningChannel) {
//         if (content === `<@&${xmageRole}>` || content === '@xmage') {
//           await message.say(`**<@&${xmageRole}> Assemble!**`);

//         } else if (content === `<@&${triceRole}` || content === '@trice' || content === '@cockatrice' || message.content === '@cock') {
//           await message.say(`**<@&${triceRole}> Assemble!**`);
//         }
//       }
//     } catch (error) {
//       message.say('Something went wrong!');
//       logger.error(error);
//     }
//   }
// };
