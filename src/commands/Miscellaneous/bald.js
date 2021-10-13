const { MessageEmbed, MessageAttachment } = require('discord.js')
const Scrapper = require('images-scraper')

const google = new Scrapper({
    puppeteer: {
        headless:true
    }
})

module.exports = {

    name: "bald",
    description: "GROSSE DÉDICACE A TOI JÉRÉMIE <3",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message) {
        
        await message.deferReply()

        var rnd = Math.floor(Math.random()*200)
        console.log(rnd)

        await message.editReply({embeds : [{description : "⏳ En attente de Google Image ... ", color:0xFF6800}]})
            .then(async (resultMessage) => {
                const img_result = await google.scrape("bald guy", 200)

                const Attach = new MessageAttachment(`${img_result[rnd].url}`,"bald_guy.png")

                let baldEmbed = new MessageEmbed()
                    .setColor(0xEDB987)
                    .setDescription(`**Jérémie n°${rnd}**`)
                    .setImage("attachment://bald_guy.png")      
                    .setTimestamp()

                resultMessage.edit({
                    embeds: [baldEmbed],
                    files:[Attach]
                })
            });
    

    }
}
    
