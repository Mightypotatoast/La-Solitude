const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    
//------------------------ ERROR -------------------------------    
    errorEmbed: () => {
        
        return new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("⛔ **Error**: ⛔")
        
    },

//------------------------ Music -------------------------------    
    musicEmbed: () => {
        return new MessageEmbed()
            .setColor("#7F00FF")
            .setAuthor("Spotifion", "https://www.iconsdb.com/icons/preview/violet/spotify-xxl.png")
        
    },

    musicButtonRow: () => {
        return new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏮️')
                    .setCustomId(`previous_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏯️')
                    .setCustomId(`pause_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏩')
                    .setCustomId(`next_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('🔀')
                    .setCustomId(`shuffle_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('🔁')
                    .setCustomId(`reapeat_button`)
					.setStyle('SECONDARY'),  
			)},

//---------------------- POKEMON -------------------------------
    pokemonEmbed: () => {
        return new MessageEmbed()
            .setAuthor("POKEDEX NATIONAL", "https://www.g33kmania.com/wp-content/uploads/Pokemon-Pokedex.png")
            .setFooter("Pokédex National | Made by Syns", "https://www.g33kmania.com/wp-content/uploads/Pokemon-Pokedex.png")
            .setTimestamp()
        
    },

    pokemonEasterEggEmbed: () => {
        return new MessageEmbed()
            .setColor("#FF0000")
            .setAuthor("POKEDEX NATIONAL", "https://www.g33kmania.com/wp-content/uploads/Pokemon-Pokedex.png")
            .setFooter("Pokédex National | Made by Syns", "https://www.g33kmania.com/wp-content/uploads/Pokemon-Pokedex.png")
            .setTimestamp()

    },


//------------------------------------------------------------------    
    
}