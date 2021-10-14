const { MessageEmbed } = require('discord.js')
const weather = require('weather-js')

module.exports = {

    name: "weather",
    description: "Fetch the weather of a location",
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "city",
            description: "Write a city",
            type: "STRING",
            required: true,
        }
    ],

  
    execute(message, client) {

        let errorEmbed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("⛔ **Erreur**: ⛔")

        weather.find({ search: message.options.getString("city"), degreeType: 'C' }, (error, result) => {
            
            if(error) return message.reply({ embeds: [errorEmbed.setDescription(`${error}`)], ephemeral: true })

            if(result === undefined || result.length === 0) return message.reply({ embeds: [errorEmbed.setDescription(`**Invalid** location`)], ephemeral: true })

            let current = result[0].current
            let location = result[0].location
            let forecast = result[0].forecast
            

            console.log(forecast)

            const resultEmbed = new MessageEmbed()
                .setColor("#111111")
                .setTitle(`Weather forecast for ${current.observationpoint} at ${current.observationtime}`)
                .setThumbnail(current.imageUrl)
                .setDescription(`**${current.skytext}**`)
                .addField('TimeZone', `UTC ${location.timezone}`, true)
                .addField('Degree Type', `Celsius`, true)
                .addField('Temperature', `${current.temperature}°C`, true)
                .addField('Feels like', `${current.feelslike}°C`, true)
                .addField('Wind', `${current.winddisplay}`, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .setTimestamp()
                        
            message.reply({embeds:[resultEmbed]})

        })
    }
}