const { joinVoiceChannel } = require('@discordjs/voice');
const { successEmbed, errorEmbed } = require('../../util/Embeds');

module.exports = {

  name: "join",
  description: "Rejoins le salon vocal",
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

          embeds: [ successEmbed().setDescription(`**J'ai rejoins le channel **${channel.name}**`) ],
          ephemeral: true,

        })
      }

    }

    else{
      message.reply({
        embeds: [errorEmbed().setDescription(`Vous devez d'abord rejoindre un salon vocal !`)],
        ephemeral: true,
      });
    }


  }
}
