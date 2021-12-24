const { DisTube } = require("distube")

module.exports = {
    
    name: 'playSong',
    once: false,

    
/**
 * @param {DisTube.Queue} queue
 * @param {DisTube.Song} song
 */
    execute(queue,song, client) {
        console.log(queue);
        if (!queue) return console.log("Queue is not defined")
        //queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
        console.log(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
    }
}