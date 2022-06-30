const { errorEmbed } = require("../../util/Embeds")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // eslint-disable-line
const { MessageEmbed, CommandInteraction, Client, MessageAttachment } = require('discord.js');


module.exports = {

    name: "overlay",
    description: "Ajoute un overlay sur ton avatar",
    permission: "ADMINISTRATOR",
    active : true,

    options: [
        {
            name: "overlay",
            description: "L'overlay que tu veux ajouter",
            type: "STRING",
            required: true,

            // choose "gay", "glass", "Wasted", "mission passed", "jail", "comrade", "triggered"

            choices: [
                {
                    name: "Gay",
                    value: "gay",
                },
                {
                    name: "Vitre",
                    value : "glass"
                },
                {
                    name: "GTA : Wasted",
                    value : "wasted"
                },
                {
                    name: "GTA : Mission Passed",
                    value : "passed"
                },
                {
                    name: "En prison",
                    value : "jail"
                },
                {
                    name: "Mon Camarade",
                    value : "comrade"
                },
                {
                    name: "Triggered",
                    value : "triggered"
                },
                {
                    name: "Carte Simp",
                    value : "simpcard"
                },
                {
                    name: "Horny",
                    value : "horny"
                },
                {
                    name: "Flouté",
                    value : "blur"
                },
                {
                    name: "Pixéliser",
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
                .setDescription(`**L'avatar de ${Target} avec l'overlay \`${overlay}\` **`)
                .setColor("WHITE")
                .setImage(`attachment://img.png`)
                .setFooter(`Demander par ${message.member.user.tag}`, message.member.displayAvatarURL())
                .setTimestamp();
            
            await message.editReply({ embeds: [embed], files: [attach] });



        } catch (err) {
            console.log(err)
            return message.editReply({ embeds: [errorEmbed().setDescription(`Une erreur est survenue`)], ephemeral: true })
        }


    }
}