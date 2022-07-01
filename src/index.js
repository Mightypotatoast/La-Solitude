require("dotenv").config();
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767 });
const Distube = require("distube");
const fs = require("fs");
client.commands = new Collection();

require("./Structures/Events")(client);
require("./Structures/Commands")(client);

client.distube = new Distube.default(client, {
    searchSongs: 0,
    emitNewSongOnly: true,
});

client.login(process.env.DISCORD_TOKEN);
