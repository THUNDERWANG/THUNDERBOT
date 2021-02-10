// attach the properties to message object
module.exports = function(message) {
	message.helpers = {
		userId: message.author.id,
		discordTag: message.author.tag,
		// ALL MESSAGES SENT SHOULD NOT MENTION--ESPECIALLY ROLES!
		noMention: { allowedMentions: { parse: [] } },
		// always begin the reply with the user's discordTag (BUT DOES NOT ALLOW MENTIONS)
		replyToAuth: async function(reply) {
			return await message.channel.send(`<@!${message.author.id}> ${reply}`, message.helpers.noMention);
		},
		reply: async function(reply) {
			return await message.channel.send(reply, message.helpers.noMention);
		},
		replyEmbed: async function(embed) {
			return await message.channel.send(embed);
		},

	};
};
