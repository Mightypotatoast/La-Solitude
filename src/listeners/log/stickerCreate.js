const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class StickerCreateListener extends Listener {
    constructor() {
        super('stickerCreate', {
            emitter: 'client',
            event: 'stickerCreate'
        });
    }

    exec(sticker) {
        
        
    }
}

module.exports = StickerCreateListener; 