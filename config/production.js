require('dotenv').config();

// settings for Online Cube Drafts server
module.exports = {
  discord: {
    botId: process.env.DISCORD_BOT_ID,
    botToken: process.env.DISCORD_BOT_TOKEN,
    serverId: '306902973706141708',
    rulesChannel: '330931500054740992',
    cubeChatChannel: '306902973706141708',
    mtgaChannelId: '801525594520682536',
    welcomeChannel: '659117988405837832',
    offTopicChannel: '396766163562004490',
    draftPlanningChannel: '711144179694043146',
    reactChannel: '832700085652553769',
    modRole: '313744722654920708',
    xmageRole: '585313738169778177',
    triceRole: '585314755976364043',
    draftingRolesMessage: '832735558916243516',
  },
  database: {
    url: process.env.MONGO_URL,
    maxSlots: 5,
  },
};
