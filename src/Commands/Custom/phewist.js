const { MessageEmbed } = require("discord.js");
const phewist = require("../../util/phewistLists")

//const config = require("../../config.json");

module.exports = {

  name: "phewist",
  description: "Générer une phrase que pourrait dire Phewist",
  permission: "ADMINISTRATOR",
  active: true,


  async execute(message) {
    
    let rndSujet = phewist.sujet[Math.floor(Math.random()*phewist.sujet.length)]
    let rndVerbs = phewist.verbs[Math.floor(Math.random()*phewist.verbs.length)]
    let rndObjet = phewist.objet[Math.floor(Math.random()*phewist.objet.length)]
    
    let phewistID = message.guild.members.cache.get("178851979332812801");

    let phewistEmbed = new MessageEmbed()
      .setColor("#666699")
      .setDescription(`**Moi, ${rndSujet}, ${rndVerbs} ${rndObjet}.**`)
      .setAuthor(phewistID ? `${phewistID.user.tag}` : "Phewist" , phewistID ? `${phewistID.user.displayAvatarURL()}` : "https://cdn.discordapp.com/avatars/178851979332812801/473cdeb49f6293a18b7c449a7774db4c.webp" )
      .setTimestamp()
    
    message.reply({embeds : [phewistEmbed]})
  },
};
