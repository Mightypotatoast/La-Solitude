const ytdl = require('ytdl-core');

exports.run = async (bot, message, args, Discord,channel,ops) => {

    if (!message.member.voiceChannel) return message.channel.send({embed :{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
      }});
    

    if (!args[0]) return message.channel.send({embed :{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Vous devez introduire un lien URL après la commande`
      }});
    
    let validation = await ytdl.validateLink(args[0]);

    if(!validation) return message.channel.send({embed :{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Vous devez introduire un lien URL valide`
      }});
    let info = await ytdl.getInfo(args[0]);
   let data = ops.active.get(message.guild.id)||{};

   if(!data.connection) data.connection = await message.member.voiceChannel.join()
   if(!data.queue) data.queue = [];
   data.guildID = message.guild.id;

   data.queue.push({
       songTitle : info.title,
       requester : message.author.tag,
       url : args[0],
       announce : message.channel.id
   });

   if(!data.dispatcher) playStream(bot, ops, data);
   else{

    message.channel.send({embed :{
        color : 0xff0000 ,
        description : `Ajouté dans la file d'attente : ${info.title} | Demandé par : ${author.id}`
      }})
    ops.active.set(message.guild.id,data);
        
   }

    async function playStream(bot, ops, data){

        bot.channels.get(data.queue[0].announceChannel).send(`Joue maintenant : ${data.queue[0].songTitle} | Demandé par : ${data.queue[0].requester}`)
        
        data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
        data.dispatcher.guildID = data.guildID;
        
        data.dispatcher.once('finish', function(){
            finish(bot, ops, this);
        })
   }
   function finish(bot, ops, dispatcher){
    let fetched =ops.active.get(dispatcher.guildID)

    fetched.queue.shift();

    if(fetched.queue.length > 0){
        ops.active.set(dispatcher.guildID, fetched);

        playStream(bot, ops, fetched);
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel
    }
   }
}