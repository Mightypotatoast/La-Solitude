const { Listener } = require('discord-akairo');
const Discord = require('discord.js')

class MessageListener extends Listener {
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {
        
        console.log(`\t---> ${message.author.username} says "${message.content}" in #${message.channel.name}`)

        if (message.attachments.size > 0) {
                
                message.react(message.guild.emojis.cache.find(emoji => emoji.name === "upvote"))
                message.react(message.guild.emojis.cache.find(emoji => emoji.name === "downvote"))
                
          }
    
    }
}

module.exports = MessageListener;