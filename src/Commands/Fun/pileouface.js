const { MessageEmbed } = require('discord.js');
module.exports = {

    name: "coinflip",
    description: "Flip a coin",
    permission: "ADMINISTRATOR",
    active : true,

    async execute(message) {
        

        try{ 
            let coin = Math.floor(Math.random() * 2)
            
            const coinEmbed = new MessageEmbed()
                .setColor('#E1A741')
                .setAuthor("Flip a coin", "https://www.pngall.com/wp-content/uploads/4/Dollar-Gold-Coin-PNG.png")
                .setDescription(`${message.user} flipped a coin and got a ${coin === 0 ? "Pile" : "Face"}`)
                .setTimestamp()
            
                message.reply({embeds: [coinEmbed]})
        } catch (error) {
            console.log(error)
            message.reply({ embeds: [errorEmbed().setDescription(`${error}`)], ephemeral: true })
        }
    }
}
