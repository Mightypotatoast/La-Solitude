const Discord = require("discord.js");
// const https = require("https");
// const axios = require("axios");
const { pokemonNames } = require("../../util/pokemonNames.json");
const { errorEmbed, pokemonEmbed, pokemonEasterEggEmbed } = require("../../util/Embeds")
const fs = require("fs")
const { fetchPokemonData } = require("../../util/functions")
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();


module.exports = {
  name: "pokemon-info",
  description: "Affiche les informations d'un pokemon",
  permission: "ADMINISTRATOR",
  active: true,
  
  options: [
    {
      name: "pokemon",
      description: "Nom ou numéro du Pokemon",
      type: "STRING",
      required: true,
    },
  ],

  async execute(message) {
        
    let pokemonArgs = message.options.getString("pokemon");
    
    let pokemonEN =  pokemonNames[pokemonArgs.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")];
    console.log()
    
    if (isNaN(pokemonArgs)) {
      
      if (pokemonEN) {           //check if the name exist
      }
      
      else if (pokemonArgs.toLowerCase() === "trepuec") {               //trepuec

        return message.reply({
          embeds: [
            pokemonEasterEggEmbed()
              .setTitle("<:pokeball:898941316451422248> \\_\\_\\_\\_\\_ François Le Trepuec \\_\\_\\_\\_\\_ <:pokeball:898941316451422248>")
              .setDescription("La centrale à la fin, je vous le dis tout de suite, Mr Leclerc il vas arriver ça vas faire wow wow wow wow")
              .setThumbnail("https://cdn.discordapp.com/attachments/492828685217431553/888620797449617438/oie_185124SSdPVhk7.gif")
          ]
        });
      }
      
      else if (pokemonArgs.toLowerCase() === "ewen") {                  //ewen
        return message.reply({
          embeds: [
            pokemonEasterEggEmbed()
              .setTitle("<:pokeball:898941316451422248> \\_\\_\\_\\_\\_ Ewen Guégan \\_\\_\\_\\_\\_ <:pokeball:898941316451422248>")
              .setThumbnail("https://cdn.discordapp.com/attachments/492828685217431553/888622310880325682/unknown.png")
          ]
        });
      }
      else {                                                            //does not exist
        return message.reply({ embeds: [errorEmbed().setDescription("Ce Pokémon n'existe pas.")] });
      }
    }
    else {
      if (!1 <= pokemonArgs <= 898) {                                   //in range
          pokemonEN = pokemonArgs
      }
      else { //not in range
        return message.reply({ embeds: [errorEmbed().setDescription("Il n'existe que 898 Pokémon à ce jour, choisis un Pokémon existant !")] });
      }
    }
    
    message.reply({
      embeds: [
        pokemonEmbed()
          .setDescription("⏳ Loading data ...")
          .setColor(0xFF6800)
      ]
    })
    
    const pokemonData = await fetchPokemonData(pokemonEN);

    let evolv = () => {

      if (!(pokemonData.evolution.length > 0)) return "```Aucune chaine d'évolution```"
              
      let str = ""

      for (chain of pokemonData.evolution) {

        for (evolv in chain){

          if (chain[evolv] === pokemonData.nom) {str += " __**`" + `${chain[evolv]}` + "`**__ "}
          else { str += " `" + `${chain[evolv]}` + "` "}

          if (chain[evolv] !== chain[chain.length - 1]) str += "-->"

        }
        str += "\n"
      }

      return str
    }


    console.log(pokemonData);

    try {
      message.editReply({
        embeds: [
          pokemonEmbed()
            .setTitle(`<:pokeball:898941316451422248> \\_\\_\\_\\_\\___| #${pokemonData.indexPokedex} ${pokemonData.nom} |__\\_\\_\\_\\_\\_ <:pokeball:898941316451422248>`)
            .setDescription(`**_${pokemonData.categorie}_**\n_\`\`\`${pokemonData.description}\`\`\`_\n`)
            .setColor("LUMINOUS_VIVID_PINK")
            .setColor(pokemonData.color)
            .setThumbnail(pokemonData.image)

            .addField("__**Type(s) :**__", "```" + `${pokemonData.types}`.replace(",", " | ") + "```")
            
            .addField("__**Région :**__", "```" + pokemonData.region.charAt(0).toUpperCase() + pokemonData.region.slice(1) + "```", true)
            .addField("__**Habitat :**__", (pokemonData.habitat === null) ? "```Non défini```" : "```" + pokemonData.habitat.charAt(0).toUpperCase() + pokemonData.habitat.slice(1) + "```", true)
            .addField("__**Taille :**__", "```" + pokemonData.taille + " m```", true)
            
            .addField("__**Version d'apparition :**__", "```" + pokemonData.version + "```", true)
            .addField("__**Forme :**__", "```" + pokemonData.shape + "```", true)
            .addField("__**Poids :**__", "```" + pokemonData.poids + " kg```", true)
            
            
            .addField("__**Légendaire :**__", pokemonData.isLegendary ? "```Oui```" : "```Non```", true)
            .addField("__**Mythique :**__", pokemonData.isMythical ? "```Oui```" : "```Non```", true)
            .addField("__**Méga-évolution :**__", pokemonData.isMega ? "```Oui```" : "```Non```", true)
            
            .addField("__**Taux de Capture :**__", "```" + Math.round(pokemonData.tauxCapture * 100 / 255, 2) + " % ```", true)
            .addField("__**Evolution :**__", evolv() , true)
          
        ]
      })
    } catch (e) {
      message.editReply({embeds:[errorEmbed().setDescription(`\`${e}\``)]})
    }

    
    // let pokemonArgs = message.options.getString("pokemon");
    //               //function that process pokemon and send them
    // const sendPokemon = (pokemon) => {
      
    //   P.getPokemonSpeciesByName(pokemon)
    //     .then(function (response) {
          
    //       let isAnimated = response.sprites.versions["generation-v"]["black-white"].animated.front_default;

    //       if (isAnimated != null) {                                 //if animated
    //         message.reply(response.names[4].name);
    //                                                                 //message.channel.send(isAnimated);
    //       }
    //       else { //not animated
    //         message.reply(response.names[4].name);
    //                                                                 //message.channel.send(response.sprites.front_default);
    //       }

    //     })
    //     .catch(function (error) { //catch error
    //       console.log("There was an ERROR: ", error);
    //       message.reply({ embeds: [errorEmbed().setDescription(`${error}`)] });
    //     });
    // };

    //                                                                 //import pokemon names
    // let tmp = config.pokemonNames.join("~").toLowerCase();
    // let pokemonNames = tmp.split("~");

    //                                                                 //check if the input contain a number
  },
};
