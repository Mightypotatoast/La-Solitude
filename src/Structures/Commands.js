const { Perms } = require("../util/Permissions"),
    { Client } = require("discord.js"),
    { promisify } = require("util"),
    { glob } = require("glob"),
    PG = promisify(glob),
    Ascii = require("ascii-table");
const { REST } = require("@discordjs/rest");
const { log } = require("console");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const fs = require("fs");
const path = require("node:path");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
    /*******************************************/
    //           COMMANDS UPDATE               //
    /*******************************************/
    client.commands = [];
    (await PG(`${process.cwd()}/src/Commands/music/*.js`)).map(async (file) => {
        const command = require(file);
        //console.log(`commande ${command.data.name} chargée 🟢`);
        client.commands.push(command.data.toJSON());
    });

    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
    (async () => {
        try {
            console.log("Started refreshing application (/) commands    .");

            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.DISCORD_CLIENT_ID,
                    "493383989588000769"
                ),
                {
                    body: client.commands,
                }
            );

            console.log("Successfully reloaded application (/) commands .");
        } catch (error) {
            console.error(error);
        }
    })();

    /*******************************************/
    //       Add commands in collection          //
    /*******************************************/
    const commandsPath = path.join(__dirname, "../Commands/music");
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        console.log(`commande ${file} trouvé`);
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        console.info(command);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.commands.set(command.data.name, command);
    }

    /*******************************************/
    //           CONSOLE RECAP                 //
    /*******************************************/
    // const Table = new Ascii("Command Loaded");
    // CommandsArray = [];
    // (await PG(`${process.cwd()}/src/Commands/music/*.js`)).map(async (file) => {
    //     const command = require(file);

    //     if (!command.name)
    //         return Table.addRow(
    //             file.split("/")[7],
    //             "🔴 FAILED",
    //             "Missing a name."
    //         );

    //     if (command.type !== "USER" && !command.description)
    //         return Table.addRow(
    //             command.name,
    //             "🔴 FAILED",
    //             "Missing a description."
    //         );

    //     if (!command.permission) {
    //         if (Perms.includes(command.permission))
    //             command.defaultPermission = false;
    //         else
    //             return Table.addRow(
    //                 command.name,
    //                 "🔴 FAILED",
    //                 "Permission is invalid."
    //             );
    //     }

    //     if (!command.active)
    //         return Table.addRow(command.name, "⚠️  DESACTIVATED");

    //     command.category = file.split("/")[file.split("/").length - 2];

    //     client.commands.set(command.name, command);
    //     CommandsArray.push(command);
    //     if (
    //         typeof command.description === "string" ||
    //         command.description instanceof String
    //     ) {
    //     } else {
    //         command.description = "No description";
    //     }

    //     await Table.addRow(command.name, "🟢 SUCCESSFUL");
    // });
    // console.log(Table.toString());
};
