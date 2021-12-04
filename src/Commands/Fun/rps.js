const { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const { errorEmbed} = require("../../util/Embeds")


module.exports = {

    name: "rps",
    description: "Play Rock Paper Scissors with the bot or someone else",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "user",
            description: "The user to play against",
            type: "USER",
            required: true,
        }
    ],
    
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        await interaction.deferReply()
        let Target = interaction.options.getMember("user")
        let Executor = interaction.member

        if (Executor.id === Target.id) return interaction.editReply({embeds : [errorEmbed().setDescription("You can't play against yourself!")], ephemeral: true})

        if (Target.id === client.user.id) return interaction.editReply({embeds : [errorEmbed().setDescription("You can't play against the bot!")], ephemeral: true})


        let inviteEmbed = new MessageEmbed()
            .setTitle(`⚔️ --- NEW RPS DUEL --- ⚔️`)
            .setDescription(`${Executor} challenges ${Target} to a duel`)
            .setColor("RED")
            .addField("Description", "Play a Rock Paper Scissors game")
        
        
        let inviteRow = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Accept')
                .setCustomId(`duel-accept`)
                .setStyle('SUCCESS'),
            new MessageButton()
                .setLabel('Decline')
                .setCustomId(`duel-decline`)
                .setStyle('DANGER')
        )
        
        const duelEmbed = new MessageEmbed()
            .setTitle(`⚔️ --- ${interaction.user.username} VS. ${Target.user.username} --- ⚔️`)
            .setColor("RED")
            .setDescription('Select 🪨, 📄, or ✂️')
            .setFooter('You have 30 seconds to make your choice')
            .addFields(
                { name: `${Executor.user.username}`, value: '🔴 Not Set', inline: true },
                { name: `------`, value: '**------**', inline: true },
                { name: `${Target.user.username}`, value: '🔴 Not Set', inline: true }
            )
            .setTimestamp()
        

        let duelRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                        .setLabel('ROCK')
                        .setCustomId('rock')
                        .setStyle("SECONDARY")
                        .setEmoji('🪨'),

                new MessageButton()
                    .setLabel('PAPER')
                    .setCustomId('paper')
                    .setStyle("SUCCESS")
                    .setEmoji('📄'),

                new MessageButton()
                    .setLabel('SCISSORS')
                    .setCustomId('scissors')
                    .setStyle("PRIMARY")
                    .setEmoji('✂️'),
            )

        let m = await interaction.editReply({ embeds: [inviteEmbed], components: [inviteRow] })
        
        const acceptCollector = m.createMessageComponentCollector({
            type: 'BUTTON',
            time: 30000
        })


       await acceptCollector.on('collect', async (button) => {
            
            if (button.user.id === Executor.id) {
                return button.reply({
                    embeds: [errorEmbed().setDescription("You can't accept your own duel")],
                    ephemeral: true
                })
            }

            if (button.user.id !== Target.id) {
                return await button.reply({
                    embeds: [errorEmbed().setDescription('You cant play the game as they didnt call you to play.')],
                    ephemeral: true
                })
            }

            if (button.customId == 'duel-decline') {
                await button.deferUpdate()
                acceptCollector.stop('decline')
                return false;
            }
           
           await button.deferUpdate()
           
            await interaction.editReply({
					embeds: [duelEmbed],
					components: [duelRow]
            })
           
            acceptCollector.stop()
           
            let ids = new Set()
            ids.add(interaction.user.id)
            ids.add(Target.id)
            let op, auth
           
            const btnCollector = m.createMessageComponentCollector({
                type: 'BUTTON',
                time: 30000
            })
            btnCollector.on('collect', async (b) => {
                if (!ids.has(b.user.id))
                    return await button.editReply({
                        content: 'You cant play the game as they didnt call u to play.',
                        ephemeral: true
                    })
                ids.delete(b.user.id)
                
                await b.deferUpdate()
                

                if (b.user.id === Executor.id) {
                    auth = b.customId

                    duelEmbed.fields[0].value = `🟢 Ready`

                    await interaction.editReply({
                        embeds: [duelEmbed],
                        components: [duelRow]
                    })

                }
                
                if (b.user.id === Target.id) {
                    op = b.customId

                    duelEmbed.fields[2].value = `🟢 Ready`

                    await interaction.editReply({
                        embeds: [duelEmbed],
                        components: [duelRow]
                    })
                }
                
                if (ids.size == 0) btnCollector.stop()

            })

            btnCollector.on('end', async (coll, reason) => {
                if (reason === 'time') {
                    
                    await interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle('Challenge Not Accepted in Time')
                                .setColor("BLACK")
                                .setDescription('Ran out of time!\nTime limit: 30s')
                        ],
                        components: []
                    })
                    
                } else {
                    const winnerMap = {
                        rock: 'scissors',
                        scissors: 'paper',
                        paper: 'rock'
                    }

                    const emojiMap = {
                        rock: '🪨',
                        scissors: '✂️',
                        paper: '📄'
                    }


                    duelEmbed.fields[0].value = `${emojiMap[auth]} ${auth}`
                    duelEmbed.fields[2].value = `${emojiMap[op]} ${op}`
                    duelEmbed.setColor("GREEN")


                    if (op === auth) {
                        duelEmbed.fields[1].value = `**DRAW**`
                        await interaction.editReply({
                            embeds: [duelEmbed],
                            components: []
                        })
                    } else if (winnerMap[op] === auth) {
                        
                        duelEmbed.fields[1].value = `**${Target} Won !**`
                        await interaction.editReply({
                            embeds: [duelEmbed],
                            components: []
                        })
                    } else {
                        //auth - won

                        duelEmbed.fields[1].value = `**${Executor} Won**`

                        await interaction.editReply({
                            embeds: [duelEmbed],
                            components: []
                        })
                    }
                }
            })
			
        })

        await acceptCollector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                await interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle('Challenge Not Accepted in Time')
                            .setColor("BLACK")
                            .setDescription('Ran out of time!\nTime limit: 30s')
                    ],
                    components: []
                })

            } else if (reason === 'decline') {
                
                await interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle('Game Declined!')
                            .setAuthor(
                                interaction.user.tag,
                                interaction.user.displayAvatarURL()
                            )
                            .setColor(options.timeoutEmbedColor || 0xc90000)
                            
                            .setDescription(`${Target} has declined your game!`)
                    ],
                    components: []
                })
                
            }

        })
    }
}
