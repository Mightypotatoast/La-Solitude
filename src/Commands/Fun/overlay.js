const { errorEmbed } = require("../../util/Embeds")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // eslint-disable-line
const { MessageEmbed, CommandInteraction, Client, MessageAttachment } = require('discord.js');


module.exports = {

    name: "overlay",
    description: "add an overlay on your avatar",
    permission: "ADMINISTRATOR",
    active : true,

    options: [
        {
            name: "overlay",
            description: "the overlay you want to add",
            type: "STRING",
            required: true,

            // choose "gay", "glass", "Wasted", "mission passed", "jail", "comrade", "triggered"

            choices: [
                {
                    name: "Gay",
                    value: "gay",
                },
                {
                    name: "Glass",
                    value : "glass"
                },
                {
                    name: "Wasted",
                    value : "wasted"
                },
                {
                    name: "Mission Passed",
                    value : "passed"
                },
                {
                    name: "Jail",
                    value : "jail"
                },
                {
                    name: "Comrade",
                    value : "comrade"
                },
                {
                    name: "Triggered",
                    value : "triggered"
                },
                {
                    name: "Simp Card",
                    value : "simpcard"
                },
                {
                    name: "Horny",
                    value : "horny"
                },
                {
                    name: "Blur",
                    value : "blur"
                },
                {
                    name: "Pixelate",
                    value : "pixelate"
                },
            ]
        },
        {
            name: "user",
            description: "the user you want to add the overlay to",
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
            
            let overlay = message.options.getString("overlay")
            let Target = message.options.getMember("user")
            
            if(!Target) Target = message.member

            const fetchAPI = async () => {
                const response = await fetch(`https://some-random-api.ml/canvas/${overlay}?avatar=${Target.displayAvatarURL({format:"png"})}`, {
                    method: "GET",
                });
                return await response;
            }


            const data = await fetchAPI();


            const attach = new MessageAttachment(data.body, 'img.png');

            const embed = new MessageEmbed()
                .setDescription(`**${Target}'s avatar with ${overlay} overlay**`)
                .setColor("WHITE")
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