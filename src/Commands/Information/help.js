const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { log } = require("util");
const { errorEmbed } = require("../../util/Embeds");

module.exports = {
    name: "help",
    description: "Shows the help menu",
    permission: "ADMINISTRATOR",
    active: true,

    options: [],

    /**
     * 
     * 
     * @param {CommandInteraction} message
     * @param {Client} client
     * 
     */
    async execute(message, client) {
        
        await message.deferReply()


        const emoji = {
            custom : "✏️",
            developper: "🔧",
            fun: "🎲",
            games: "🎮",
            information: "🔍",
            miscellaneous: "💠",
            moderation: "🔨",
            music: "🎵",
            pokemon: "🐱",
            setup: "⚙️",

        }
        


        const directories = [...new Set(client.commands.map(c => c.category))];

        console.log(directories);

        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
        

        const categories = directories.map(d => {
            const getCommands = client.commands
                .filter(c => c.category === d)
                .map((cmd) => {
                    return {
                        name: cmd.name || 'There is no name',
                        description: cmd.description || 'There is no description',
                    }
                });
            
            console.log(d)
            
            return {
                directory: formatString(d),
                commands: getCommands,
                emoji: emoji[d.toLowerCase()] || "🔷"
            };
        });

        const helpEmbed = new MessageEmbed()
            .setAuthor(`${client.user.username} Help Menu`, client.user.avatarURL())
            .setColor('#0099ff')
            .setDescription(`Please select a category`)
            .setFooter(`Requested by ${message.user.tag}`, message.member.avatarURL())
            .setTimestamp();
        
        const components = (state) => {
            return new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('help-menu')
                    .setPlaceholder('Select a category')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((c) => { 
                            return {
                                label: c.directory,
                                value: c.directory.toLowerCase(),
                                description: `Commands from ${c.directory} category`,
                                emoji: emoji[c.directory.toLowerCase()] || "🔷"
                            };
                        })
                    )
                
            )
        
        };


        const m = await message.editReply({
            embeds: [helpEmbed],
            components: [components(false)],
        })

        const filter = (interaction) => {
            return interaction.user.id === message.member.id;
        }

        const collector = m.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 600000,
        });

        collector.on('collect', async (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(c => c.directory.toLowerCase() === directory);

            helpEmbed.setTitle(`${category.emoji} --- ${category.directory} Commands --- ${category.emoji}`)
                .setDescription("")
                .setFields(
                    category.commands.map(c => { 
                        return {
                            name: `\`/${c.name}\``,
                            value: c.description,
                        }
                    })
            );

            
            message.editReply({
                embeds: [helpEmbed],
            })
            
            await interaction.deferUpdate()
        });

        collector.on('end', async (collected, reason) => {
            m.edit({
                components: [components(true)],
            })
        });


    }
}