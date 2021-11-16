const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { errorEmbed, banEmbed } = require("../../util/Embeds")

const db = require('../../Models/infraction')

module.exports = {
    name: "ban",
    description: "Bans a user from the server.",
    permission: "BAN_MEMBERS",
    active: true,
    options: [
        {
            name: "member",
            description: "The user to ban.",
            type: "USER",
            require: true,
        },
        {
            name: "reason",
            description: "The reason for the ban",
            type: "STRING",
            require: true,
        },
        {
            name: "messages",
            description: "Number of days to delete mesages for (0-7)",
            type: "NUMBER",
            require: true,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */

    execute(interaction, client) {
        
        const { guild, member } = interaction
        const Target = interaction.options.getMember("member")
        const Reason = interaction.options.getString("reason")
        const Amount = interaction.options.getNumber("messages")
        
        if (!Target) return interaction.reply({embeds : [errorEmbed().setDescription("Please provide a valid user.")]})
        if (!Reason) return interaction.reply({embeds : [errorEmbed().setDescription("Please provide a valid reason.")]})
        if (!Amount) return interaction.reply({embeds : [errorEmbed().setDescription("Please provide a valid number of days.")]})

        if (Amount > 7 || Amount < 0) return interaction.reply({embeds : [errorEmbed().setDescription("Please provide a valid number of days.")], ephemeral: true})
        
        if (Target.id === member.id) return interaction.reply({embeds : [errorEmbed().setDescription("You can't ban yourself.")], ephemeral: true})
        
        if (Target.id === client.user.id) return interaction.reply({embeds : [errorEmbed().setDescription("You can't ban me.")], ephemeral: true})
        if (Target.id === guild.ownerID) return interaction.reply({embeds : [errorEmbed().setDescription("You can't ban the server owner.")], ephemeral: true})

        if (Target.roles.highest.position > member.roles.highest.position) return interaction.reply({embeds : [errorEmbed().setDescription("You can't ban a user with a higher role than you.")], ephemeral: true})
        if (Target.permissions.has(this.perms)) return interaction.reply({embeds : [errorEmbed().setDescription("You can't ban a user who had " + this.permission + " permission")], ephemeral: true})
        
        Target.send({ embeds: [banEmbed().setDescription("You have been banned from **" + guild.name + "** for **" + Reason + "**")] })
        .catch(() => {
            console.log("I can't DM that user.")
        })

        //interaction.reply({embeds : [banEmbed().setDescription(Target + " has been banned by "+ member.user +" from **" + guild.name + "** for **" + Reason + "**")]})

        db.findOne({
            guildID: guild.id,
            userID: Target.id
        }, async (err, data) => {
            if (err) throw err
            if (!data || !data.BanData) {
                data = new db({
                    GuildID: guild.id,
                    GuildName: guild.name,
                    UserID: Target.id,
                    UserTag: Target.user.tag,
                    BanData: {
                        ExecutorID: member.id,
                        ExecutorTag: member.user.tag,
                        TargetID: Target.id,
                        TargetTag: Target.user.tag,
                        Messages: Amount,
                        Reason: Reason,
                        Data: parseInt(interaction.createdTimestamp / 1000)

                    }
                })
            } else {
                const BanDataObject = {
                    ExecutorID: member.id,
                    ExecutorTag: member.user.tag,
                    TargetID: Target.id,
                    TargetTag: Target.user.tag,
                    Messages: Amount,
                    Reason: Reason,
                    Data: parseInt(interaction.createdTimestamp / 1000)
                }
                data.BanData.push(BanDataObject)
            }

            data.save()

            
        })

        interaction.reply({embeds : [banEmbed().setDescription("Banning " + Target + " for " + Reason + " for " + Amount + " days.")]})
        Target.ban({ days: Amount, reason: Reason })
            .catch(err => {
                console.log(err)
            })
        
    }
}