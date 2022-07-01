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
const commandsPath = path.join(__dirname, "./Commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    console.log(` ${file} command file found 🟢`);
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //console.info(command);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.login(process.env.DISCORD_TOKEN);
