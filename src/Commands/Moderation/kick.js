const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {

    name: "kick",
    description: "Kick un membre du serveur",
    permission: "KICK_MEMBERS",
    active:true,

    options: [
        {
            name: "member",
            description: "Le membre à kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Raison du kick",
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
        
        if (!Target) return interaction.reply({embeds : [errorEmbed().setDescription("Vous devez mentionner un membre")], ephemeral: true})
        if (!Reason) return interaction.reply({embeds : [errorEmbed().setDescription("Vous devez mettre une raison")], ephemeral: true})
        
        if (Target.id === member.id) return interaction.reply({embeds : [errorEmbed().setDescription("Vous ne pouvez pas vous kick")], ephemeral: true})
        
        if (Target.id === client.user.id) return interaction.reply({embeds : [errorEmbed().setDescription("Vous ne pouvez pas me kick")], ephemeral: true})
        if (Target.id === guild.ownerID) return interaction.reply({embeds : [errorEmbed().setDescription("Vous ne pouvez pas kick le propriétaire du serveur")], ephemeral: true})

        if (Target.roles.highest.position > member.roles.highest.position) return interaction.reply({embeds : [errorEmbed().setDescription("Vous ne pouvez pas kick une personne ayant plus de droit que vous")], ephemeral: true})
        if (Target.permissions.has("ADMINISTRATOR")) return interaction.reply({embeds : [errorEmbed().setDescription("Vous ne pouvez pas kick quelqu'un qui a la permission ADMINISTRATOR")], ephemeral: true})
        
        Target.send({ embeds: [kickEmbed().setDescription("Vous avez été kick du serveur **" + guild.name + "** pour la raison suivante : \n**" + Reason + "**")] })
        .catch(() => {
            console.log("Impossible d'envoyer un message privé à " + Target.user.username)
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
                    GuildName: guild.name,
                    UserID: Target.id,
                    UserTag: Target.user.tag,
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

        interaction.reply({embeds : [kickEmbed().setDescription( Target + " a été kick pour la raison suivante : \n" + Reason + ".")]})
        Target.kick({reason: Reason })
            .catch(err => {
                console.log(err)
            })
    }
}