const { MessageEmbed, Util } = require('discord.js')
const delay = require("delay")
const { errorEmbed } = require("../../util/Embeds")


module.exports = {

    name: "emoji-steal",
    description: "Steal an emoji from another server",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "emoji",
            description: "Put your emoji(s) | Maximum : 10",
            type: "STRING",
            required: true,
            
        },
        
    ],

    
    async execute(message, client) {

        

        let argsEmoji = message.options.getString('emoji')
        let emoji = []


        emoji = argsEmoji.split("<")
        emoji.shift()

        for (let i = 0; i < emoji.length; i++) {
            emoji[i] = "<"+emoji[i]   
        }    
        
        
        let embedCreate = new MessageEmbed()
            .setColor("#25E325")
            .setTitle("Nouveaux émojis ")
            .setDescription(`**${emoji.length}** émojis ajoutés au serveur. (${message.guild.emojis.cache.size + emoji.length}/50)`)
            .setTimestamp()
        

        try {
            await message.reply({
                embeds: [{ description: "⏳ Uploading Emojis ...", color: 0xFF6800 }]
            })

            if (emoji.length == 0) throw "This is not a guild emoji";
            //if (emoji.length >= 11) throw "Choose a maximum of 10 emojis per command";

            for (const rawEmoji of emoji) {

                
                
                const parsedEmoji = Util.parseEmoji(rawEmoji);

                if (rawEmoji !== `<:${parsedEmoji.name}:${parsedEmoji.id}>` && rawEmoji !== `<a:${parsedEmoji.name}:${parsedEmoji.id}>`) throw rawEmoji + " This is not a guild emoji";
                
                if (parsedEmoji.id) {
                    const extension = parsedEmoji.animated ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`

                    
                    
                    await message.guild.emojis.create(url, parsedEmoji.name)
                    await embedCreate.addField(parsedEmoji.name, `<${(parsedEmoji.animated) ? "a" : ""}:${parsedEmoji.name}:${parsedEmoji.id}>`, true)
                }
            }
            await delay("2000")
            await message.editReply({embeds:[embedCreate]})
        }
        catch (e) {
            message.editReply({embeds:[errorEmbed().setDescription(`${e}`)]})
        }
        
        
    }

}