const { MessageEmbed } = require("discord.js");

module.exports = {
    
//------------------------ ERROR -------------------------------    
    errorEmbed: () => {
        
        let errorEmbed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("⛔ **Erreur**: ⛔")
        
        return errorEmbed;
    },

//---------------------- POKEMON -------------------------------
    pokemonEmbed: () => {
        let pokemonEmbed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("<:pokeball:898941316451422248> \_\_\_\_\_ POKEDEX \_\_\_\_\_ <:pokeball:898941316451422248>")
            .setTimestamp()
        
        return pokemonEmbed;
    },

    pokemonEasterEggEmbed: () => {
        let pokemonEasterEggEmbed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("<:pokeball:898941316451422248> \\_\\_\\_\\_\\_ POKEDEX \\_\\_\\_\\_\\_ <:pokeball:898941316451422248>")
            .setTimestamp()
        
        return pokemonEasterEggEmbed;
    },


//------------------------------------------------------------------    
    
}