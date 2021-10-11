const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    
    name: 'messageDelete',
    once: false,

    async execute(message) {

        

        for(const [key, value] of Object.entries(config.channel)){
            if (message.channel.id === value) return;
        };


        let logs = await message.guild.fetchAuditLogs({
            limit : 1,
            type: "MESSAGE_DELETE"
        });
        let entry = logs.entries.first(a =>    
            Date.now() - a.createdTimestamp < 20000
        );
        

        console.log(entry)
        //if (entry.length === 0) return console.log(`A message by ${message.author.tag || "someone"} was deleted, but no relevant audit logs were found.`);
        
        const messageEmbed = new MessageEmbed()
            .setTitle("**Un message a été supprimé !**")
            .setColor("#E73C3C")
            //.addField("Auteur", (entry.target.id === message.author.id && entry.target.id !== null) ? entry.target.tag || message.author.tag : "None", true)
            //.addField('Supprimé par', (entry.target.id === message.author.id && entry.target.id !== null) ? entry.executor.tag  : "None", true)
            .addField('Channel', "#" + message.channel.name)
            .addField('Message', (message.embeds.length > 0) ? "`Embed Message`" : (message.content === null || message.content.length == 0) ? "`None`" : message.content)
            .addField('Attachment', (message.attachments.size == 0) ? "`None`" : (message.attachments.size > 1) ? "plusieurs" : "1",)
            //            .addField('Threaded ?', (message.hasThread) ? "Oui" : "Non", true)
            //            .addField("Raison", entry.reason || "Non spécifié")
            //            .addField('URL', `(Link)[$message.url]`)
            .setImage((message.attachments.size == 0) ? null : `${message.attachments.first().url}`)
            .setTimestamp()
        
        message.guild.channels.cache.get(config.channel.logID).send({ embeds: [messageEmbed] });
    
        
        // console.log(entry)
        // console.log("\n***************************************************************************************\n")
        // console.log(message)
       
    }
}