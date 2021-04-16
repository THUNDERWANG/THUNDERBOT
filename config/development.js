require('dotenv').config();

// settings for development server
module.exports = {
  discord: {
    botId: process.env.DEV_DISCORD_BOT_ID,
    botToken: process.env.DEV_DISCORD_BOT_TOKEN,
    serverId: '794675408570023937',
    rulesChannel: '802301626588201010',
    cubeChatChannel: '802301626588201010',
    mtgaChannelId: '802301626588201010',
    welcomeChannel: '802301626588201010',
    offTopicChannel: '802301626588201010',
    draftPlanningChannel: '832699885387907114',
    reactChannel: '832699885387907114',
    modRole: '795506335721717760',
    xmageRole: '796164518115541012',
    triceRole: '796164469738831872',
    draftingRolesMessage: '832734344724348968',
  },
  database: {
    url: 'mongodb://localhost/the-grand-calcutron',
    maxSlots: 5,
  },
};
