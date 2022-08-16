const { Client } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @returns 
 */
function loadCommands(client){
    const ascii = require('ascii-table');
    const fs = require("fs");
    const table = new ascii().setHeading("Events", "Status");
    const { REST } = require('@discordjs/rest');
    
    let commandsArray = [];
    let developerArray= [];

    const commandsFolders = fs.readdirSync(`${process.cwd()}/src/Commands`)

    for (const folder of commandsFolders) {
        const commandFiles = fs
            .readdirSync(`${process.cwd()}/src/Commands/${folder}`)
            .filter((file) => file.endsWith(".js"))

        for (const file of commandFiles) {
            const commandFile = require(`${process.cwd()}/src/Commands/${folder}/${file}`)

            client.commands.set(commandFile.data.name, commandFile);

            if(commandFile.developer) 
                developerArray.push(commandFile.data.toJSON())
            else
                commandsArray.push(commandFile.data.toJSON())
            
            table.addRow(file, "🟩");
            continue;

        }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
    (async () => {
        try {
            console.log("Started refreshing application (/) commands    .");

            await rest.put(
                Routes.applicationCommands(client.user.id),
                {
                    body: commands,
                }
            );

            console.log("Successfully reloaded application (/) commands .");
        } catch (error) {
            console.error(error);
        }
    })();

    const developerGuild = client.guilds.cache.get(process.env.DEV_GUILD);

    developerGuild.commands.set(developerArray);

    return console.log(table.toString(), "\nLoaded Commands")
}

module.exports = { loadCommands }