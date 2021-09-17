const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')


class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
        const exampleEmbed = new MessageEmbed()
	        .setColor('#ff0000')
	        .setDescription(`${member} est parti(e). `)
	        .setTimestamp();


        
        
        if (channel) {
            member.guild.channels.cache.get(config.channel.au_revoirID).send({embeds : [exampleEmbed]})
        } else {console.log("pas trouvé le channel 'bienvenue'");}
    }
}

module.exports = GuildMemberRemoveListener;