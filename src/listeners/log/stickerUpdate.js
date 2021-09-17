const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class StickerUpdateListener extends Listener {
    constructor() {
        super('stickerUpdate', {
            emitter: 'client',
            event: 'stickerUpdate'
        });
    }

    exec(oldSticker, newSticker) {
        
        
    }
}

module.exports = StickerUpdateListener; 