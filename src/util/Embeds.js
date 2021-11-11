const { MessageEmbed,} = require("discord.js");

module.exports = {
    
//!------------------------ ERROR -------------------------------    
    errorEmbed: () => {
        
        return new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("⛔ **Error**: ⛔")
            .setTimestamp()
        
    },

//!------------------------ Music -------------------------------    
    musicEmbed: () => {
        return new MessageEmbed()
            .setColor("#7F00FF")
            .setAuthor("Spotifion", "https://www.iconsdb.com/icons/preview/violet/spotify-xxl.png")
            .setTimestamp()
    },
//!---------------------- POKEMON -------------------------------
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
//!---------------------- Warning -------------------------------
    warningEmbed: () => {
        return new MessageEmbed()
            .setColor("YELLOW")
            .setTitle("⚠️ - **WARNING SYSTEM** - ⚠️")
            .setTimestamp()
    }
    
    
//------------------------------------------------------------------   
    
}