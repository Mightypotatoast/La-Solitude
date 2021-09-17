const { Listener } = require('discord-akairo');

class ErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'client',
            event: 'error'
        });
    }

    exec(error) {

            console.log(error);

    }
}

module.exports = ErrorListener;