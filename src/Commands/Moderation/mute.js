const ms = require('ms')
const { CommandInteraction } = require('discord.js')
const db = require('../../Models/infraction')
const { errorEmbed, muteEmbed } = require('../../util/Embeds')

module.exports = {

    name: "mute",
    description: "Mutes a user for a specified amount of time.",
    permission: "MUTE_MEMBERS",
    active: true,
    options: [
        {
            name: "member",
            description: "The user to mute.",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason for the mute.",
            type: "STRING",
            required: true,
        },
        {
            name: "duration",
            description: "The duration of the mute.",
            type: "NUMBER",
            required: true,
        },
        {
            name: "duration-type",
            description: "The duration of the mute.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Seconds",
                    value: "seconds"
                },
                {
                    name: "Minutes",
                    value: "minutes"
                },
                {
                    name: "Hours",
                    value: "hours"
                },
                {
                    name: "Days",
                    value: "days"
                },
                {
                    name: "Weeks",
                    value: "weeks"
                },
                {
                    name: "Months",
                    value: "months"
                },
                
            ]
        },
    ],
    /**
     * 
     * @param { CommandInteraction } message
     * 
     */

    async execute(message) {
        message.deferReply
        let Target = message.options.getMember("member")
        let Reason = message.options.getString("reason")
        let Duration = message.options.getNumber("duration")
        let DurationType = message.options.getString("duration-type")

        // Create a mute role if it doesn't exist.

        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")
        if (!muteRole) {
            try {

                muteRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                })
                
                await message.guild.channels.cache.map(async (channel) => {
                    await channel.permissionOverwrites.edit(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                });
                
            } catch (e) {
                console.log(e);
            }
        }
        if (Target.id === message.member.id) return message.reply({ embeds: [errorEmbed().setDescription("You cannot mute yourself!")], ephemeral: true })
        if (Target.roles.cache.has(muteRole.id)) return message.reply({ embeds: [errorEmbed().setDescription("That user is already muted!")], ephemeral: true })
        if (Target.id === message.client.user.id) return message.reply({ embeds: [errorEmbed().setDescription("I cannot mute myself!")], ephemeral: true })
        if (Target.id === message.guild.ownerID) return message.reply({ embeds: [errorEmbed().setDescription("I cannot mute the server owner!")], ephemeral: true })
        if (Target.roles.highest.position > message.member.roles.highest.position) return message.reply({ embeds: [errorEmbed().setDescription("You cannot mute a user with a higher role than you!")], ephemeral: true })
        
        db.findOne({ GuildID: message.guild.id, UserID: Target.id }, async (err, data) => {
            if (err) console.log(err)
            if (!data) {
                data = new db({
                    GuildID: message.guild.id,
                    GuildName: message.guild.name,
                    UserID: Target.id,
                    MuteData: [
                        {
                            ExecutorID: message.member.id,
                            ExecutorTag: message.member.user.tag,
                            TargetID: Target.id,
                            TargetTag: Target.user.tag,
                            Reason: Reason,
                            Duration: `${Duration} ${DurationType}`,
                            Date: parseInt(message.createdTimestamp / 1000),
                        }
                    ]
                })            
            } else {

                const MuteDataObject = {
                    ExecutorID: message.member.id,
                    ExecutorTag: message.member.user.tag,
                    TargetID: Target.id,
                    TargetTag: Target.user.tag,
                    Reason: Reason,
                    Duration: Duration,
                    Date: parseInt(message.createdTimestamp / 1000),
                }

                data.MuteData.push(MuteDataObject)    
            }
            data.save()
                .catch(err => console.log(err))

            
                    
            
            Target.send({
                embeds: [
                    muteEmbed()
                        .setDescription(`You have been muted by ${message.member} in **${message.guild.name}**`)
                        .addField("Reason", Reason)
                        .addField("Duration", `${Duration} ${DurationType}`)
                ]
            })
                .catch(() => {
                    console.log(`Could not send the mute notice to ${Target.user.tag}.`)
                });
            
            
            Target.roles.add(muteRole)

            setTimeout(async () => {
                Target.roles.remove(muteRole)
            }, (ms(`${Duration} ${DurationType}`) > 21474836477) ? 21474836476 : ms(`${Duration} ${DurationType}`))


            message.reply({
                embeds: [
                    muteEmbed()
                        .addField("Muted user", `${Target} | \`${Target.id}\``)
                        .addField("Reason", Reason)
                        .addField("Duration", `${Duration} ${DurationType}`)
                    
                ],
            })
        
        })
    
    }

}