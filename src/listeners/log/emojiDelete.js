const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class EmojiDeleteListener extends Listener {
    constructor() {
        super('emojiDelete', {
            emitter: 'client',
            event: 'emojiDelete'
        });
    }

    exec(emoji) {
        
        
    
    }
}

module.exports = EmojiDeleteListener; 