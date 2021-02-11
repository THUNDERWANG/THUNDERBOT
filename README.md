This is the discord bot used in the Online Cube Drafts server and hosted via Heroku and utilizes MongoDB.
To contact THUNDERWANG, join the discord link: https://discord.gg/4eHADtb

Instructions:
1. Create a .env file using .env.example
2. Update configs with the appropriate IDs--use only default config if there is no development Discord server.
3. Webhook will not work without another server/channel, so make a dedicated channel to parse the input if needed.
3. To add new commands, use app\discord\handlers\message\commands\example as a template.
