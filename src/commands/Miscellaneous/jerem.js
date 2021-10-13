const { MessageEmbed, MessageAttachment } = require('discord.js')
const Scrapper = require('images-scraper')

const google = new Scrapper({
    puppeteer: {
        headless:true
    }
})

module.exports = {

    name: "jerem",
    description: "Fait spawn un jérémie sauvage",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message) {
        
        await message.deferReply()

        var rnd = Math.floor(Math.random()*200)
        console.log(rnd)

        await message.editReply({embeds : [{description : "⏳ En attente de Google Image ... ", color:0xFF6800}]})
            .then(async (resultMessage) => {
                const img_result = await google.scrape("chauve barbue", 200) //changer en chauve barbue

                const Attach = new MessageAttachment(`${img_result[rnd].url}`,"jerem.png")

                let baldEmbed = new MessageEmbed()
                    .setColor(0xEDB987)
                    .setDescription(`**Jérémie n°${rnd}**`)
                    .setImage("attachment://jerem.png")      
                    .setTimestamp()

                resultMessage.edit({
                    embeds: [baldEmbed],
                    files:[Attach]
                })
            });
    

    }
}
    