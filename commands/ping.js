  
 exports.run = async (bot, message, args, Discord,channel,ops) => {
    
    message.channel.send({embed :{
        color : 0xff0000 ,
        description :`**Pong !** \n Latence : ${Date.now() - message.createdTimestamp} ms`,
      }});
      console.log('Ping pong')
}