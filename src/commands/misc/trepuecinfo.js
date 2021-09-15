const { Command } = require('discord-akairo');

class TrepuecInfoCommand extends Command {
    constructor() {
        super('trepuecinfo', {
           aliases: ['trepuecinfo'] 
        });
    }

    exec(message) {
        var trepuecembed = new Discord.MessageEmbed()
            .setTitle("Le Trepuec")
            .setAuthor(this.client.user.username, this.client.user.avatarURL)
            .setDescription('Mr Le Trepuec est un professeur de Technologie dans le Lycée St Joseph La Salle à Lorient. L\'émerveillement des lycéens à propos de ce professeur provient de son charisme à tout épreuve et de sa façon de parler indéniable. \n ** ATTENTION : cette personne pointe autant que TheKairi78**')
            .setColor(0xFF6800)
            .setImage("./src/util/img/trepuec.jpg")
            .setTimestamp();

        message.channel.send({embeds : [trepuecembed]});

    }
}

module.exports = TrepuecInfoCommand;