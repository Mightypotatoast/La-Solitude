module.exports = {
    
    name: 'messageCreate',
    once: false,

    execute(message) {

        console.log(`\t---> ${message.author.username} says "${message.content}" in #${message.channel.name}`)

        if (message.attachments.size > 0) {
                
                message.react(message.guild.emojis.cache.find(emoji => emoji.name === "upvote"))
                message.react(message.guild.emojis.cache.find(emoji => emoji.name === "downvote"))
                
          }
        
    }
}