const { errorEmbed } = require("../../util/Embeds")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // eslint-disable-line
const { MessageEmbed, CommandInteraction, Client, MessageAttachment } = require('discord.js');


module.exports = {

    name: "faketweet",
    description: "Fakes a tweet",
    permission: "ADMINISTRATOR",
    active : true,

    options: [
        {
            name: "tweet",
            description: "what do you want to tweet",
            type: "STRING",
            required: true,

        },
        {
            name: "user",
            description: "the user writing the comment",
            type: "USER",
            required: false
        }
    ],

    /**
     * 
     * @param {CommandInteraction} message 
     * @param {Client} client 
     */

    async execute(message,client) {
        
        try {
        
            await message.deferReply().catch(() => { });
            
            let tweet = message.options.getString("tweet")
            let Target = message.options.getMember("user")
            
            if(!Target) Target = message.member

            const fetchAPI = async () => {
                const response = await fetch(`https://some-random-api.ml/canvas/tweet?avatar=${Target.displayAvatarURL({format:"png"})}&username=${Target.user.username}&displayname=${ Target.nickname ? Target.nickname : Target.user.username }&comment=${tweet}`, {
                    method: "GET",
                });

                return await response;
            }


            const data = await fetchAPI();


            const attach = new MessageAttachment(data.body, 'img.png');

            const embed = new MessageEmbed()
                .setDescription(`**${Target}'s Tweet**`)
                .setColor("NAVY")
                .setImage(`attachment://img.png`)
                .setFooter(`Requested by ${message.member.user.tag}`, message.member.displayAvatarURL())
                .setTimestamp();
            
            await message.editReply({ embeds: [embed], files: [attach] });



        } catch (err) {
            console.log(err)
            return message.editReply({ embeds: [errorEmbed().setDescription(`Une erreur est survenue`)], ephemeral: true })
        }


    }
}