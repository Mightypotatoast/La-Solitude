const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler} = require('discord-akairo');
const { Presence } = require('discord.js');

module.exports = class BotClient extends AkairoClient {
    constructor(config = {}) {
        super(
            {   ownerID: '206905331366756353'   }, 
            {
                allowedMentions: {
                    parse:[ 'roles', 'everyone', 'users'],
                    repliedUser: false
                },
                partials : ['CHANNEL','GUILD_MEMBER','MESSAGE','REACTION','USER'],
                presence: {
                    status: 'dnd',
                    activities: [
                        {
                            name: "se code gentillement ...",
                            type:"PLAYING"
                            
                        }
                    ]
                },
                intents: 32767,
            }
        );


        this.commandHandler = new CommandHandler(this, {
            allowMention: true,
            prefix: config.prefix,
            defaultCooldown: 2000,
            directory: './src/commands/'
        });


        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });



        this.commandHandler.loadAll();

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();

    }
}
