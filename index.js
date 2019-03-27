const Discord = require('discord.js'),
      bot = new Discord.Client({ disableEveryone: true }),
      config = require('./config'),
      active = new Map();
      prefix = "!";
      overwatch = require('overwatch-api')

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('ready', () => {
  var memberCount = bot.users.size;
  console.log("--------------------------------------");
  console.log('[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Le préfix actuelle:  ' + prefix + "\n[!]Nombre de membres: " + memberCount + '\n');
  bot.user.setActivity('en maintenance')

})

bot.on('disconnect', () => console.log('Je viens de m\'éteindre, je vais me rallumé maintenant ... '));

bot.on('reconnecting', () => console.log('Je suis revenu !!!'));

bot.on('guildMemberAdd', member =>{

  member.guild.channels.find("name", "bienvenue").send({embed :{
    color : 0x00ff00 ,
    description : `Bonjour ${member} et bienvenue sur le serveur Sensokami. Nous sommes maintenant **${member.guild.memberCount}** sur ce serveur.`
  }});

   var role = member.guild.roles.find('name', 'Des gens');
   member.addRole(role);

})
      
bot.on('guildMemberRemove', member =>{
  member.guild.channels.find("name", "au_revoir").send({embed :{
    color : 0xff0000 ,
    description : `${member} est parti(e). `
  }
   
  })
})

bot.on('message', async message => {

  const channel = message.member.voiceChannel;

  if(message.author.equals(bot.user)) return undefined;
  if(!message.content.startsWith(prefix)) return undefined;

  var args = message.content.slice(prefix.length).split(' ');
  var cmd = args.shift().toLowerCase();

  try{

    delete require.cache[require.resolve(`./commands/${cmd}`)];
    let commandFile = require(`./commands/${cmd}.js`);
    let ops = {
      active:active
    }

    commandFile.run(bot, message, args, Discord, channel, overwatch, ffmpeg)
  

  } catch(e) {
    console.log(`ERROR : le !${cmd} n'existe pas.`);
    message.channel.send({embed :{
      color : 0xff0000 ,
      description :` ${message.member} \n** Erreur :** \n Votre commande **\`\`!${cmd}\`\`** n'existe pas. \n Pour plus d'informations, Tapez **\`\`!help\`\`**. `,   
    }});
  }
})

  bot.login(config.Token);
