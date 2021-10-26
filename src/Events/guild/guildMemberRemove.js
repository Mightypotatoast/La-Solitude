const { MessageEmbed } = require('discord.js');
const config = require('../../config')


module.exports = {
    
    name: 'guildMemberRemove',
    once: false,

    execute(member) {

       const exampleEmbed = new MessageEmbed()
	        .setColor('#ff0000')
	        .setDescription(`${member} est parti(e). `)
	        .setTimestamp();

        
        if (channel) {
            try {
                member.guild.channels.cache.get(config.channel.au_revoirID).send({embeds : [exampleEmbed]})
            } catch (e) {
                console.log("pas trouvé le channel 'au_revoir'")
            }
        } else { console.log("pas trouvé le channel 'au_revoir'"); }
        
    }
}