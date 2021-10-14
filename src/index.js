require('dotenv').config();
const {Client, Collection, MessageEmbed} = require("discord.js");
const client = new Client({ intents: 32767 });
const distube = require('distube')


client.commands = new Collection()

require("./Structures/Events")(client);
require("./Structures/Commands")(client);

client.distube = new distube.default(client, { searchSongs: 0, emitNewSongOnly: true })

client.distube.on('playSong', (queue, song) => {

    queue.textChannel.send({
        embeds: [
            new MessageEmbed()
                .setColor("#00A6FF")
                .setTitle("🎵 **Playing Song**")
                .setDescription(`Playing ${song.name} - \`${song.formattedDuration}\` \n Requested by ${song.user}`)
        ]

    })

})

client.distube.on('addSong', (queue, song) => {

    queue.textChannel.send({
        embeds: [
            new MessageEmbed()
                .setColor("#00A6FF")
                .setTitle("🎵 **New Song Added**")
                .setDescription(`Adding ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        ]

    })

})


client.distube.on('error', (channel, e) => {

    channel.send({
        embeds: [
            new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("⛔ **Erreur**: ⛔")
                .setDescription(`Une erreur a été rencontrée :\n\`${e}\` `)
        ]

    })

})

client.login(process.env.DISCORD_TOKEN)