const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const puppeteer = require('puppeteer')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {

    name: "lyrics",
    description: "Display the lyrics of the playing song",
    permission: "ADMINISTRATOR",
    active: true,
    
    async execute(message, client) {
        try {
            
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            message.reply({
            embeds: [
            musicEmbed()
            .setDescription("⏳ Searching ...")
            ]
            })

            songName = queue.songs[0].name.replace(/ *\([^)]*\) */g, "")
            const browser = await puppeteer.launch({headless: true})
            const page = await browser.newPage()
            await page.setViewport({ width: 1280, height: 720 });
            url = `https://lyrics.ovh`
            encodeURI(url)
            await page.goto(url)
            await page.type("#search-input", songName, {delay: 25})
            await sleep(500) 
            await page.click('#results > li:nth-child(1)');            
            await sleep(500)
            lyrics = await page.evaluate(() => {
                
                let elements = document.querySelector('#thelyrics')
                return elements.innerHTML.replace(/<br\s*[\/]?>/gi, "\n")
            })
            browser.close()

            message.editReply({
                embeds: [
                musicEmbed()
                .setDescription(`${lyrics}`)
            ]})
        } catch (e) {
            message.editReply({ embeds: [errorEmbed().setDescription(`No lyrics found for this song`)], ephemeral: true })
        }

    }
}