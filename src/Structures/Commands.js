const { Perms } = require("../util/Permissions"),
    { Client } = require("discord.js"),
    { promisify } = require("util"),
    { glob } = require("glob"),
    PG = promisify(glob),
    Ascii = require("ascii-table"),
    config = require("../config");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Console, log } = require("console");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
    /*******************************************/
    //           COMMANDS UPDATE
    //           CONSOLE RECAP                 //
    /*******************************************/
    commandsArrayScync = [];
    const Table = new Ascii("Command Loaded");
    CommandsArray = [];
    (await PG(`${process.cwd()}/src/Commands/music/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
            return Table.addRow(
                file.split("/")[7],
                "🔴 FAILED",
                "Missing a name."
            );

        if (command.type !== "USER" && !command.description)
            return Table.addRow(
                command.name,
                "🔴 FAILED",
                "Missing a description."
            );

        if (!command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return Table.addRow(
                    command.name,
                    "🔴 FAILED",
                    "Permission is invalid."
                );
        }

        if (!command.active)
            return Table.addRow(command.name, "⚠️  DESACTIVATED");

        command.category = file.split("/")[file.split("/").length - 2];

        client.commands.set(command.name, command);
        CommandsArray.push(command);
        commandsArrayScync.push(command.data.toJSON());
        if (
            typeof command.description === "string" ||
            command.description instanceof String
        ) {
        } else {
            command.description = "No description";
        }

        await Table.addRow(command.name, "🟢 SUCCESSFUL");
    });
    console.log(Table.toString());

    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
    (async () => {
        try {
            console.log("Started refreshing application (/) commands.");
            console.log(commandsArrayScync);
            await rest.put(
                Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
                {
                    body: commandsArrayScync,
                }
            );

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);
        }
    })();

    /*******************************************/
    //           PERMISSIONS CHECK
    //!            NE MARCHE PLUS              //
    /*******************************************/

    /**
     * @param {Client} client
     */

    // client.on("ready", async (client) => {

    //     guild = []

    //     client.guilds.cache.map(e => guild.push(e))

    //     guild.forEach(async (guild) => {

    //         try {
    //             guild.commands.set(CommandsArray).then(async (command) => {
    //                 const Roles = (commandName) => {
    //                     const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
    //                     if (!cmdPerms) return null;

    //                     return guild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
    //                 }

    //                 const fullPermissions = command.reduce((accumulator, r) => {
    //                     const roles = Roles(r.name);
    //                     if (!roles) return accumulator;

    //                     const permissions = roles.reduce((a, r) => {
    //                         return [...a, { id: r.id, type: "ROLE", permission: true }]
    //                     }, []);

    //                     return [...accumulator, { id: r.id, permissions }]
    //                 }, []);

    //                 await guild.commands.permissions.set({ fullPermissions });
    //             });

    //         } catch (e) { console.log(e); }
    //     });
    // });
};
