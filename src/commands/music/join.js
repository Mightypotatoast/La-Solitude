const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {

  name: "join",
  description: "Join your voice Channel",
  permission: "ADMINISTRATOR",
  active : true,

  async execute(message) {
    var channel = message.member.voice.channel;
    //bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    if (channel){

      joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
      })

      if (joinVoiceChannel) {
        message.reply({

          ephemeral: true,
          embeds: [{

              color: 0x25E325 ,
              description: "✅ **Connected**",

          }]

        })
      }

    }

    else{
      message.reply({
        ephemeral: true,
        embeds: [{

          color: 0xff0000,
          title: "**Erreur**:",
          description: `Vous devez d'abord rejoindre un salon vocal`
          
        }]
      });
    }


  }
}
