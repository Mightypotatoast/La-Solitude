const { Perms } = require("../util/Permissions"),
    { Client } = require("discord.js"),
    { promisify } = require("util"),
    { glob } = require("glob"),
    PG = promisify(glob),
    Ascii = require("ascii-table");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const fs = require("node:fs");
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
    /*******************************************/
    //           COMMANDS UPDATE              //
    /*******************************************/

    const commands = [];
    fs.readdirSync("./src/Commands").forEach((dir) => {
        const commandfiles = fs
            .readdirSync(`./src/Commands/${dir}/`)
            .filter((file) => file.endsWith(".js"));
        for (const file of commandfiles) {
            const command = require(`../src/Commands/${dir}/${file}`);
            console.log(`Loading  ${command.data.name}`, "cmd");
            commands.push(command.data.toJSON());
        }
    });
    console.log(`commands :${commands}`);
    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
    (async () => {
        try {
            console.log("Started refreshing application (/) commands    .");

            await rest.put(
                Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
                {
                    body: commands,
                }
            );

            console.log("Successfully reloaded application (/) commands .");
            console.log(commands);
        } catch (error) {
            console.error(error);
        }
    })();

    /*******************************************/
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
