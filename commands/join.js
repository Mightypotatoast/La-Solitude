 
exports.run = async (bot, message, args, Discord,channel,ops) => {
    
    if (channel){
        channel.join()
          .then(connection => console.log(`\n Connected on channel ${channel.name}!`))
          .catch(console.error);
      }

      else{
        message.channel.send({embed :{
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
        }});
      }
 }