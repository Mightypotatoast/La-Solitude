const { DisTube } = require("distube")
const { errorEmbed} = require("../../util/Embeds")

module.exports = {
    
    name: 'error',
    once: false,

    
/**
 * @param {DisTube.Queue} queue
 * @param {DisTube.Song} song
 */
    async execute(channel, error) {
        
        try{
            console.log(`Error: ${error}, in channel: ${channel}`)
        } catch (e) {
            console.log(e)
        }

        try{
            channel.guild.channels.cache.get((await config(newChannel.guild.id)).channel.logID).send({ embeds : [errorEmbed().setDescription(`${e}`)] });
        } catch (e) {
            console.log(e);
        }

    }
}
