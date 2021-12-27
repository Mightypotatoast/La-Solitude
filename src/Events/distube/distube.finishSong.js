const { DisTube } = require("distube")


module.exports = {
    
    name: 'finishSong',
    once: false,

    
/**
 * @param {DisTube.Queue} queue
 * @param {DisTube.Song} song
 */
    async execute(queue,song) {
        if (!queue) return console.log("Queue is not defined")

        console.log(`Finished \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)

    }
}
