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

            //open Browser
            const browser = await puppeteer.launch({headless: true})
            const page = await browser.newPage()
            await page.setViewport({ width: 1366, height: 768})
            await page.goto('https://www.google.com/search?q=genius+lyrics+' + queue.songs[0].name.replace(/ /g, "+"))
            
            //wait and accept cookies
            await page.waitForSelector('#L2AGLb')
            await page.click('#L2AGLb')
            await sleep(500)
            
            //get to the lyrics page
            await page.waitForSelector('h3.LC20lb', {timeout: 10000});
            await page.evaluate(() => {
                let elements = document.querySelectorAll('h3.LC20lb')
                elements[0].click()
            })

            //wait and accept cookies
            await sleep(1000)
            await page.waitForSelector('#onetrust-accept-btn-handler')
            await page.click('#onetrust-accept-btn-handler')
            await sleep(1000)
            
            //scrap the lyrics
            lyrics = await page.evaluate(() => {
                let elements = document.querySelector('body > routable-page > ng-outlet > song-page > div > div > div.song_body.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div > defer-compile:nth-child(2) > lyrics > div > div > section > p')
                return elements.innerText
            })

            //close browser
            browser.close()

            message.editReply({
                embeds: [
                musicEmbed()
                .setDescription(`${lyrics}`)
            ]})
        } catch (e) {
            message.editReply({ embeds: [errorEmbed().setDescription(`Lyrics not found`)], ephemeral: true })
            console.log(e);
        }

    }
}