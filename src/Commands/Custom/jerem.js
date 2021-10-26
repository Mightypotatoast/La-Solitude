const { MessageEmbed, MessageAttachment } = require('discord.js')
const Scrapper = require('images-scraper')

try {
    const google = new Scrapper({
        puppeteer: {
            headless: true,
            executablePath: '/usr/bin/chromium-browser',
        }
    })
} catch (e) {
    const google = new Scrapper({
        puppeteer: {
            headless: true,
        }
    })}

module.exports = {

    name: "jerem",
    description: "Fait spawn un jérémie sauvage",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message) {
        
        await message.deferReply()

        let rnd = Math.floor(Math.random() * 200),
            listNB =  [34,35,143]
        
        while (listNB.includes(rnd)) {
         
            rnd = Math.floor(Math.random() * 200)
        
        }
        
        console.log(rnd)

        await message.editReply({embeds : [{description : "⏳ En attente de Google Image ... ", color:0xFF6800}]})
            .then(async (resultMessage) => {

                let img_result;

                try {
                    const google = new Scrapper({
                        puppeteer: {
                            headless: true,
                            executablePath: '/usr/bin/chromium-browser',
                        }
                    })

                    img_result = await google.scrape("chauve barbue", 200) //changer en chauve barbue


                } catch (e) {


                    const google = new Scrapper({
                        puppeteer: {
                            headless: true,
                        }
                    })
                       
                    img_result = await google.scrape("chauve barbue", 200) //changer en chauve barbue
                 }



                let baldEmbed = new MessageEmbed()
                    .setColor(0xEDB987)
                    .setDescription(`**Jérémie n°${rnd}**`)
                    .setImage(img_result[rnd].url)      
                    .setTimestamp()

                resultMessage.edit({
                    embeds: [baldEmbed],
                })
            
            });
    

    }
}
    
