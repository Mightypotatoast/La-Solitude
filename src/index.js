const BotClient = require("./structures/BotClient");
require('dotenv').config();

let bot = new BotClient({
    prefix: process.env.PREFIX
});

bot.login(process.env.DISCORD_TOKEN)