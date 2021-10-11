require('dotenv').config();
const {Client, Collection} = require("discord.js");
const client = new Client({ intents: 32767 });

client.commands = new Collection()

require("./Structures/Events")(client);
require("./Structures/Commands")(client);


client.login(process.env.DISCORD_TOKEN)