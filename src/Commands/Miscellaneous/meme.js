const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const delay = require("delay")

const MAX_MEME = 5

module.exports = {

    name: "meme",
    description: "Fetch a meme from reddit",
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "how-many",
            description: `How many memes do you want? | Maximum : ${MAX_MEME}`,
            type: "NUMBER",
            required: false,
        }
    ],


    async execute(message) {
        
        let errorEmbed = new MessageEmbed().setColor("#FF0000").setTitle("⛔ **Erreur**: ⛔")

        let memeNumber = (message.options.getNumber("how-many") === null) ? 1 : Math.floor(message.options.getNumber("how-many"));
        
        if (memeNumber > MAX_MEME || memeNumber <= 0)
            return message.reply({ embeds: [errorEmbed.setDescription(`Choisissez un nombre entre 1 et ${MAX_MEME}`)], ephemeral: true })

        for (let i = 0; i < memeNumber; i++) {

            let messageMeme
            
            let data = await fetch("http://meme-api.herokuapp.com/gimme/memes").then(res => res.json())
        
            let embedReponse = new MessageEmbed()
                .setTitle(data.title)
                .setURL(data.postLink)
                .setColor("#00D7FF")
                .setFooter(data.ups + "Upvotes")
                .setTimestamp()
                .setImage(data.url)
            if (i == 0) {
                messageMeme = await message.reply({ embeds: [embedReponse], fetchReply: true })
            }
            else {
                messageMeme = await message.channel.send({ embeds: [embedReponse], fetchReply: true})
            }

            await messageMeme.react(message.guild.emojis.cache.find(emoji => emoji.name === "upvote"))
            await messageMeme.react(message.guild.emojis.cache.find(emoji => emoji.name === "downvote"))

        }
      
  },
};
