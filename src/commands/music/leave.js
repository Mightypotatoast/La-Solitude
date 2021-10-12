const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
    name: "leave",
    description: "Leave your voice Channel",
    permission: "ADMINISTRATOR",
    active : true,

    async execute(message) {

        if (!message.member.voice.channel) return message.reply({
            ephemeral: true,
            embeds: [{
                color : 0xff0000 ,
                title: `⛔ **Erreur**: ⛔`,
                description : `Vous devez d'abord rejoindre le salon vocal où le BOT se trouve de préférence.`
            }]
        });
      
        if (!message.guild.me.voice.channel) return message.reply({

            ephemeral: true,
            embeds: [{
          
                color : 0xff0000 ,
                title: `⛔ **Erreur**: ⛔`,
                description : `Le bot n'est pas connecter dans un salon vocal`

            }]
        })

        if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.reply({

            ephemeral: true,
            embeds: [{
                color : 0xff0000 ,
                title: `⛔ **Erreur**: ⛔`,
                description : `Vous n'êtes pas dans le même salon que le bot.`
            }]
        })

        var connection = getVoiceConnection(message.guild.id)
        connection.destroy();
      
        message.reply({

          ephemeral: true,
          embeds: [{

              color: 0x25E325 ,
              description: "👋 **SALAM**",

          }]

        })
      

    }
}

