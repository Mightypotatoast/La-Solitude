const Discord = require('discord.js'),
      bot = new Discord.Client({ disableEveryone: true }),
      config = require('./config'), 
      active = new Map(),
      Canvas = require('canvas'),
      snekfetch = require('snekfetch'),
      prefix = "!";
      
const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
      
        // Declare a base size of the font
        let fontSize = 60;
      
        do {
          // Assign the font to the context and decrement it so it can be measured again
          ctx.font = `${fontSize -= 10}px FV Almelo`;
          // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);
      
        // Return the result to use in the actual canvas
        return ctx.font;
      };


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

bot.on('guildMemberAdd', async member =>{
  const channel = member.guild.channels.find(ch => ch.name === 'bienvenue');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 300);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./commands/img/wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);


  var text1 = "BIENVENUE";
  
  ctx.font = '80px FV Almelo'
  ctx.fillStyle = '#ffffff';
  var TextWidth1 = ctx.measureText(text1).width
	ctx.fillText(text1, (canvas.width/2) - (TextWidth1/2), canvas.height / 1.25);

	
  ctx.font = applyText(canvas, `${member.displayName}`);
  var memberTextWidth = ctx.measureText(member.displayName).width
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}`, (canvas.width/2) - (memberTextWidth/2), canvas.height / 1.05);

  ctx.beginPath();
	ctx.arc(canvas.width/2, 85, 70, 0, Math.PI * 2, true);
	ctx.closePath();
  ctx.clip();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect((canvas.width/2)-100 , 0 , 200, 200);

	ctx.beginPath();
	ctx.arc(canvas.width/2, 85, 65, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, (canvas.width/2)-65 , 20 , 130, 130);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
  const Addembed = new Discord.RichEmbed()
      .setTitle("BIENVENUE")
      .setColor(0x00ff00)
      .setDescription(`Bonjour ${member} et bienvenue sur le serveur Sensokami. Nous sommes maintenant **${member.guild.memberCount}** sur ce serveur.`, attachment)
 
  channel.send(Addembed);
  channel.send(attachment);


   var rol = member.guild.roles.find(role => role.name === "Des gens");
   member.addRole(rol);

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

  var args = message.content.slice(prefix.length).split(/[ ]+/);
  var cmd = args.shift().toLowerCase();
  try{

    delete require.cache[require.resolve(`./commands/${cmd}`)];
    let commandFile = require(`./commands/${cmd}.js`);
    let ops = {
      active:active
    }

    commandFile.run(bot, message, args, Discord, channel)
  

  } catch(e) {
    console.log(e.stack)
    console.log(`ERROR : le !${cmd} n'existe pas.`);
    message.channel.send({embed :{
      color : 0xff0000 ,
      description :` ${message.member} \n** Erreur :** \n Votre commande **\`\`!${cmd}\`\`** n'existe pas. \n Pour plus d'informations, Tapez **\`\`!help\`\`**. `,   
    }});
  }
})

  bot.login(config.Token);
