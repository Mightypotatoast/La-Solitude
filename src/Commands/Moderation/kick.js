const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {

    name: "kick",
    description: "Kick a user from the server.",
    permission: "KICK_MEMBERS",
    active:true,

    options: [
        {
            name: "member",
            description: "The user to kick.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "The reason for the kick.",
            type: "STRING",
            required: false
        }
    ],
    
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    async execute(interaction) {
        const { guild, member } = interaction
        const Target = interaction.options.getMember("member")
        const Reason = interaction.options.getString("reason")
        const Amount = interaction.options.getNumber("messages")
        
        if (!Target) return interaction.reply({embeds : [errorEmbed().setDescription("Please provide a valid user.")]})
        if (!Reason) return interaction.reply({embeds : [errorEmbed().setDescription("Please provide a valid reason.")]})
        

        if (Amount > 7 || Amount < 0) return interaction.reply({embeds : [errorEmbed().setDescription("Please provide a valid number of days.")]})
        
        if (Target.id === member.id) return interaction.reply({embeds : [errorEmbed().setDescription("You can't kick yourself.")]})
        
        if (Target.id === client.user.id) return interaction.reply({embeds : [errorEmbed().setDescription("You can't kick me.")]})
        if (Target.id === guild.ownerID) return interaction.reply({embeds : [errorEmbed().setDescription("You can't kick the server owner.")]})

        if (Target.roles.highest.position > member.roles.highest.position) return interaction.reply({embeds : [errorEmbed().setDescription("You can't kick a user with a higher role than you.")]})
        if (Target.permissions.has(this.perms)) return interaction.reply({embeds : [errorEmbed().setDescription("You can't kick a user who had " + this.permission + " permission")]})
        
        Target.send({ embeds: [kickEmbed().setDescription("You have been kicked from **" + guild.name + "** for **" + Reason + "**")] })
        .catch(() => {
            console.log("I can't DM that user.")
        })

        //interaction.reply({embeds : [banEmbed().setDescription(Target + " has been banned by "+ member.user +" from **" + guild.name + "** for **" + Reason + "**")]})

        db.findOne({
            guildID: guild.id,
            userID: Target.id
        }, async (err, data) => {
            if (err) throw err
            if (!data || !data.KickData) {
                data = new db({
                    GuildID: guild.id,
                    UserID: Target.id,
                    KickData: {
                        ExecutorID: member.id,
                        ExecutorTag: member.user.tag,
                        TargetID: Target.id,
                        TargetTag: Target.user.tag,
                        Reason: Reason,
                        Data: parseInt(interaction.createdTimestamp / 1000)

                    }
                })
            } else {
                const KickDataObject = {
                    ExecutorID: member.id,
                    ExecutorTag: member.user.tag,
                    TargetID: Target.id,
                    TargetTag: Target.user.tag,
                    Reason: Reason,
                    Data: parseInt(interaction.createdTimestamp / 1000)
                }
                data.KickData.push(KickDataObject)
            }

            data.save()

            
        })

        interaction.reply({embeds : [banEmbed().setDescription("Kicking " + Target + " for " + Reason + ".")]})
        Target.kick({reason: Reason })
            .catch(err => {
                console.log(err)
            })
    }
}