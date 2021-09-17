const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class EmojiUpdateListener extends Listener {
    constructor() {
        super('emojiUpdate', {
            emitter: 'client',
            event: 'emojiUpdate'
        });
    }

    exec(oldEmoji, newEmoji) {
        
        
    
    }
}

module.exports = EmojiUpdateListener; 