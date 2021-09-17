const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


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


        var channel = member.guild.channels.cache.find(ch => ch.name === 'au_revoir')
        
        if (channel) {
            member.guild.channels.cache.get(channel.id).send({embeds : [exampleEmbed]})
        } else {console.log("pas trouvé le channel 'bienvenue'");}
    }
}

module.exports = GuildMemberRemoveListener;