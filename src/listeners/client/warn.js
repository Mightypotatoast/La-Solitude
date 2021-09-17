const { Listener } = require('discord-akairo');

class WarnListener extends Listener {
    constructor() {
        super('warn', {
            emitter: 'client',
            event: 'warn'
        });
    }

    exec(info) {
        
        console.log(info);
    
    }
}

module.exports = WarnListener;