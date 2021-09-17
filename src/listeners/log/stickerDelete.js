const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class StickerDeleteListener extends Listener {
    constructor() {
        super('stickerDelete', {
            emitter: 'client',
            event: 'stickerDelete'
        });
    }

    exec(sticker) {
        
        
        
    }
}

module.exports = StickerDeleteListener; 