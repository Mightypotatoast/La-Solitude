module.exports = {
    
    name: 'messageCreate',
    once: false,

    execute(message,client) {

        if(message.author.id !== client.user.id) console.log(`\t---> ${message.author.username} says "${message.content}" in #${message.channel.name}`)

        if (message.attachments.size > 0 && message.author !== message.client.user) {
                
            try {       
                message.react(message.guild.emojis.cache.find(emoji => emoji.name === "upvote"))
                message.react(message.guild.emojis.cache.find(emoji => emoji.name === "downvote"))
            } catch (e) {
            console.log(e);
            }
          }
        
    }
}