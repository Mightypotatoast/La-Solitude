const BotClient = require("./structures/BotClient");
require('dotenv').config();

let client = new BotClient({
    prefix: process.env.PREFIX
});

client.login(process.env.DISCORD_TOKEN)