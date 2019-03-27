 exports.run = async (bot, message, args, Discord,channel, ops, overwatch, ffmpeg) => {
    prefix = '!';
    var args = message.content.slice(prefix.length).split(' ');
    var cmd = args[1].toLowerCase();
    switch (cmd){

        case "trepuec":              
        
            if (channel){
              channel.join()
                .then(connection => {
                  console.log(`\n Connected on channel ${channel.name}!`);
                  const dispatcher = connection.playFile('./commands/audio/EWEN.wav');
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
                  const dispatcher = connection.playFile('./audio/daniel.mp3');
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
                  const dispatcher = connection.playFile('./audio/puelamerde.mp3');
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
                  const dispatcher = connection.playFile('./audio/silence.mp3');
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
              description : ` ${message.member} \n **Erreur**: \n Audio invalide.`
            }});
            break;
}}