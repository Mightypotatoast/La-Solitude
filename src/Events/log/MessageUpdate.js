const { MessageEmbed } = require('discord.js')
const config = require('../../config')



module.exports = {
    
    name: 'messageUpdate',
    once: false,

    async execute(oldMessage, newMessage, client) {

        
            
        
        if (newMessage.author.bot || newMessage.user.id === client.user.id) return;
        if (newMessage.channel.id === channel.logID) return;
        if (oldMessage.content === newMessage.content) return;
        
        let { channel } = await config(newMessage.guild.id)
        
        let logs = await newMessage.guild.fetchAuditLogs({ type: "MESSAGE_UPDATE" });
        let entry = logs.entries.first(a => Date.now() - a.createdTimestamp < 20000);

        const messageEmbed = new MessageEmbed()
            .setTitle("**Un message a été modifié !**")
            .setColor("#3CE7E7")
            .addField('Auteur', newMessage.member.user.tag, true)
            .addField('Modifié par', entry.executor || "`None`", true)
            .addField('Channel', newMessage.channel.name)
            .addField('Ancien Message', (oldMessage.content == null || oldMessage.content == "") ? "`None`" : oldMessage.content)
            .addField('Nouveau Message', (newMessage.content == null || newMessage.content == "") ? "`None`" : newMessage.content)
            .addField('URL', `[Voir le message](${newMessage.url})`)
            .setTimestamp()
          
        try {       
            newMessage.guild.channels.cache.get(channel.logID).send({ embeds : [messageEmbed] });
        } catch (e) {
            console.log(e);
        }
       
    }
}