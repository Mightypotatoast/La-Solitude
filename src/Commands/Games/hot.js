const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { errorEmbed } = require("../../util/Embeds")




module.exports = {

    name: "hot",
    description: "Hot Combien ... tu suce ton père ?",
    permission: "ADMINISTRATOR",
    active: false,

    options: [
        {
            name: "user",
            description: "La personne que tu veux challengé",
            type: "USER",
            required: true,
        },
        {
            name: "combien",
            description: "Nombre max du Hot",
            type: "NUMBER",
            required: true,
        },
        {
            name: "challenge",
            description: "Raison de ce Hot-Combien",
            type: "STRING",
            required: false,
        }
    ],



    async execute(message, client) {

        let executor = message.user
        let target = message.options.getMember('user')
        let NumberMax = message.options.getNumber('combien')
        let reason = message.options.getString('challenge')


        if (target.bot) return message.reply({ embeds: [errorEmbed().setDescription("Vous ne pouvez pas défier un Bot.")] });
        if (executor.id === target.id) return message.reply({ embeds: [errorEmbed().setDescription("Vous ne pouvez pas vous auto-défier.")] });

        //console.log();
        message.channel.guild.members.cache.find((member) => member.id === executor.id).send("coucou")

        let ChallengeEmbed = new MessageEmbed()
            .setTitle("🔥 **Hot Combien** 🔥")
            .setColor("BLURPLE")
            .addField(`**Challenge** : ${reason}`)

            .addField("Sens", "",true)

            .addField(`${executor.user.username}`, `⚫*en attente ...*`, true)
            .addField("➡️ Normal ➡️", `Hot ${NumberMax}`, true)
            .addField(`${target.user.username}`, `⚫*en attente ...*`, true)

        message.reply({embeds : [ChallengeEmbed]})

        const filter = msg => {
            return [target.id, executor.id].includes(msg.author.id) && (1 <= parseInt(msg.content) <= NumberMax)
        }

        

        let dmEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle("🔥 **Hot Combien** 🔥")
            .setDescription(`**Challenge** : ${reason}\n Choisissez un nombre entre 1 et ${NumberMax}\n\n Tu as 30 secondes`)

        executor.send({embeds:[dmEmbed]})
        target.send({embeds:[dmEmbed]})

        let executorCollector = await executor.dmChannel.createMessageCollector({
            filter,
            max: 1,
            time: 30000
        })

        let targetCollector = await target.dmChannel.createMessageCollector({
            filter,
            max: 1,
            time: 30000
        })


        executorCollector.on('collect', message => {
            console.log(message.content)
        })

        targetCollector.on('collect', message => {
            console.log(message.content)
        })

        executorCollector.on('end', collected => {
            if (collected.size === 0) {
                message.deleteReply()
                return executor.dmChannel.send({ embeds: [errorEmbed.setDescription('Aucune réponse n\'a été envoyé')], ephemeral: true })
            }

            numberExecutor = collected[0]
            console.log(collected)


        })

        targetCollector.on('end', collected => {
            if (collected.size === 0) {
                message.deleteReply()
                return target.dmChannel.send({ embeds: [errorEmbed.setDescription('Aucune réponse n\'a été envoyé')], ephemeral: true })
            }

            numberTarget = collected[0]
            console.log(collected)


        })

    
    }
}



function Validation(interaction) {}