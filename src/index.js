require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

require("./Structures/Events")(client);


client.login(process.env.DISCORD_TOKEN)