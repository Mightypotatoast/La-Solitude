require('dotenv').config();
const {Client, Collection, MessageEmbed} = require("discord.js");
const client = new Client({ intents: 32767 });
const distube = require('distube')


client.commands = new Collection()
client.buttons = new Collection()

require("./Structures/Events")(client);
require("./Structures/Commands")(client);

client.distube = new distube.default(client, { searchSongs: 0, emitNewSongOnly: true })

client.login(process.env.DISCORD_TOKEN)