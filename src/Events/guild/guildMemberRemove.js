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

        
        
        (!config(member.guild.id).channel.au_revoirID) ? console.log("/!\\ Le salon 'au_revoir' n'est pas initialisé /!\\") : member.guild.channels.cache.get(config(member.guild.id).channel.au_revoirID).send({embeds : [exampleEmbed]})
            
        
    }
}