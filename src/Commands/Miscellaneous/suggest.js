const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../Models/suggest");
const { successEmbed } = require("../../util/Embeds");

module.exports = {
    name: "suggest",
    description: "Suggest something to the bot owner",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "type",
            description: "The type of suggestion",
            type: "STRING",
            required: true,
            choices: [
                { name: "Command", value: "Command" },
                { name: "Event", value: "Event" },
                { name: "System", value: "System" },
                { name: "Bug", value: "Bug" },
                { name: "Other", value: "Other" }
            ]
        },
        {
            name: "suggestion",
            description: "Describe your suggestion",
            type: "STRING",
            required: true
        }
        
    ],
    
    /**
     * @param {CommandInteraction} message
     */

    async execute(message, client) {
        const { options, guildId, member, user } = message;
        
        const Type = options.getString("type");
        const Suggestion = options.getString("suggestion");

        const Embed = new MessageEmbed()
            .setTitle(`${Type} Suggestion`)
            .setColor("NAVY")
            .addFields(
                { name: "Author", value: `${user.tag} - ||${user.id}||` },
                { name: "Guild", value: `${message.guild.name} - ||${guildId}||\n\n` },
                { name: "Suggestion", value: Suggestion},
                { name: "Type", value: Type, inline: true },
                { name: "Status", value: "🟠 Pending", inline: true }
            )
            .setTimestamp();
        
        const Buttons = new MessageActionRow();

        Buttons.addComponents(
            new MessageButton().setCustomId('suggest-accept').setLabel("✅ Accept").setStyle("SECONDARY"),
            new MessageButton().setCustomId('suggest-decline').setLabel("⛔ Decline").setStyle("SECONDARY"),
            new MessageButton().setCustomId('suggest-delete').setLabel("🗑️ Delete").setStyle("DANGER")
        )
        
        try {

            const M = await client.guilds.cache.get("235816886259023872").channels.cache.get("915665024012419212").send({embeds: [Embed], components: [Buttons], fetchReply : true});

            message.reply({embeds: [successEmbed().setDescription("Your suggestion has been sent to the bot owner!")], ephemeral: true});

            await db.create({
                GuildID: guildId, MessageID: M.id, Details: [{
                    MemberID: member.id,
                    Type: Type,
                    Suggestion: Suggestion,
                    Status: "Pending"
                }]
            });


        } catch (e) {
            console.log(e);
        }

    }
}