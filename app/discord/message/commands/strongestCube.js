module.exports = {
	name: 'strongestcube',
	aliases: ['strongest'],
	args: false,
	description: 'retrieve the **STRONGEST CUBE**',
	async execute(message) {
		try {
			await message.channel.send(':muscle: https://www.reddit.com/r/mtgcube/comments/ckqqx8/the_strongest_cube_in_excistence/ :muscle:');
		} catch (error) {
			console.error(error);
		}
	},
};