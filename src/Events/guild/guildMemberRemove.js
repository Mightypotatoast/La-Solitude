const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')


module.exports = {
    
    name: 'guildMemberRemove',
    once: false,

    execute(member) {

       const exampleEmbed = new MessageEmbed()
	        .setColor('#ff0000')
	        .setDescription(`${member} est parti(e). `)
	        .setTimestamp();

        
        if (channel) {
            member.guild.channels.cache.get(config.channel.au_revoirID).send({embeds : [exampleEmbed]})
        } else { console.log("pas trouvé le channel 'au_revoir'"); }
        
    }
}