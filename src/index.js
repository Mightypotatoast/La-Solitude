require("dotenv").config();
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767 });
const Distube = require("distube");
const fs = require("fs");
const path = require("node:path");

require("./Structures/Events")(client);
require("./Structures/Commands")(client);

client.distube = new Distube.default(client, {
    searchSongs: 0,
    emitNewSongOnly: true,
});

/*******************************************/
//       Add commands in collection          //
/*******************************************/

client.commands = new Collection();

client.login(process.env.DISCORD_TOKEN);
