const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class EmojiCreateListener extends Listener {
    constructor() {
        super('emojiCreate', {
            emitter: 'client',
            event: 'emojiCreate'
        });
    }

    exec(emoji) {
        
        
    
    }
}

module.exports = EmojiCreateListener; 