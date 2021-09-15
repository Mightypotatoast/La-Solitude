const { Command } = require('discord-akairo');
const Discord = require('discord.js')

class TrepuecInfoCommand extends Command {
    constructor() {
        super('trepuecinfo', {
           aliases: ['trepuecinfo'] 
        });
    }

    exec(message) {

        const trepuecAttach = new Discord.MessageAttachment('./src/util/img/trepuec.jpg')

        var trepuecembed = new Discord.MessageEmbed()
            .setTitle("Le Trepuec")
            .setDescription('Mr Le Trepuec est un professeur de Technologie dans le Lycée St Joseph La Salle à Lorient. L\'émerveillement des lycéens à propos de ce professeur provient de son charisme à tout épreuve et de sa façon de parler indéniable. \n ** ATTENTION : cette personne pointe autant que TheKairi78**')
            .setColor(0xFF6800)
            .setImage("attachment://trepuec.jpg")
            .setTimestamp();

        message.channel.send({embeds : [trepuecembed], files : [trepuecAttach]});

    }
}

module.exports = TrepuecInfoCommand;