 exports.run = async (bot, message, args, Discord,channel, ops, overwatch, ffmpeg) => {
    prefix = '!';

    try{
    
      var cmdAudio = args.shift(1).toLowerCase()
    
    switch (cmdAudio){

        case "trepuec":              
        
            if (channel){
              channel.join()
                .then(connection => {
                  console.log(`\n Connected on channel ${channel.name}!`);
                  const dispatcher = connection.playFile('./commands/fAudio/EWEN.wav');
                  dispatcher.on("end", end => {
                    channel.leave()
                    console.log(`\n Disconnected on channel ${channel.name} sur !`);      
                  });
      
                })
                .catch(console.error);
            }

            else{
              message.channel.send({embed :{
                color : 0xff0000 ,
                description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
              }});
            }

            break;

        case "daniel":

            if (channel){
              channel.join()
                .then(connection => {
                  console.log(`\n Connected on channel ${channel.name}!`);
                  const dispatcher = connection.playFile('./commands/fAudio/daniel.mp3');
                  dispatcher.on("end", end => {
                    channel.leave()
                    console.log(`\n Disconnected on channel ${channel.name}!`);      
                  });
                })
                .catch(console.error);
            }

            else{
              message.channel.send({embed :{
                color : 0xff0000 ,
                description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
              }});
            }

            break;

        case "puelamerde":

            if (channel){
              channel.join()
                .then(connection => {
                  console.log(`\n Connected on channel ${channel.name}!`);
                  const dispatcher = connection.playFile('./commands/fAudio/puelamerde.mp3');
                  dispatcher.on("end", end => {
                    channel.leave()
                    console.log(`\n Disconnected on channel ${channel.name}!`);      
                  });
                })
                .catch(console.error);
            }

            else{
              message.channel.send({embed :{
                color : 0xff0000 ,
                description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
              }});
            }

            break;
            
            
          case "silence":

            if (channel){
              channel.join()
                .then(connection => {
                  console.log(`\n Connected on channel ${channel.name}!`);
                  const dispatcher = connection.playFile('./commands/fAudio/silence.mp3');
                  dispatcher.on("end", end => {
                    channel.leave()
                    console.log(`\n Disconnected on channel ${channel.name}!`);      
                  });
                })
                .catch(console.error);
            }

            else{
              message.channel.send({embed :{
                color : 0xff0000 ,
                description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
              }});
            }

            break;

        default :
            
            message.channel.send({embed :{
              color : 0xff0000 ,
              description : ` ${message.member} \n **Erreur**: \n Audio inexistant. \n\n **Audio valide :**\n **\`\`trepuec\`\`** \n **\`\`daniel\`\`** \n **\`\`silence\`\`** \n **\`\`puelamerde\`\`** `
            }});
            break;
    }

  }
    
  catch(e){
    message.channel.send({embed :{
      color : 0xff0000 ,
      description : ` ${message.member} \n **Erreur**: \n Aucun audio séléctionnée. \n\n **Audio valide :**\n **\`\`trepuec\`\`** \n **\`\`daniel\`\`** \n **\`\`silence\`\`** \n **\`\`puelamerde\`\`** `
    }});
  }

}