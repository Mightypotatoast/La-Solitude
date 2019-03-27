  
 exports.run = async (bot, message, args, Discord,channel,ops) => {

    var trepuecembed = new Discord.RichEmbed()
                .setTitle("Le Trepuec")
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setDescription('Mr Le Trepuec est un professeur de Technologie dans le Lycée St Joseph La Salle à Lorient. L\'émerveillement des lycéens à propos de ce professeur provient de son charisme à tout épreuve et de sa façon de parler indéniable.')
                .setColor(0xE2FF00)
                .setImage("https://cdn.discordapp.com/attachments/235816886259023872/451852369395712008/34034043_2045110069074968_5402766909282189312_n.jpg")
                .setTimestamp();

    message.channel.send(trepuecembed);
}