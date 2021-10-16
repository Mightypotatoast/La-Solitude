const Discord = require("discord.js");
// const https = require("https");
// const axios = require("axios");
const config = require("../../util/pokemonNames.json");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

module.exports = {
  name: "pokemon",
  description: "Choisis ton Pokemon",
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
    let pokemon = message.options.getString("pokemon");

    //function that process pokemon and send them
    const sendPokemon = (pokemon) => {
      P.getPokemonByName(pokemon)
        .then(function (response) {
          
          let isAnimated = response.sprites.versions["generation-v"]["black-white"].animated.front_default;

          if (isAnimated != null) { //if animated
            message.reply(response.name);
            message.channel.send(isAnimated);
          } else { //not animated
            message.reply(response.name);
            message.channel.send(response.sprites.front_default);
          }
        })
        .catch(function (error) { //catch error
          console.log("There was an ERROR: ", error);
          message.reply(error);
        });
    };

    //import pokemon names
    let tmp = config.pokemonNames.join("~").toLowerCase();
    let pokemonNames = tmp.split("~");

    //check if the input contain a number
    if (isNaN(pokemon)) {
      if (pokemonNames.includes(pokemon.toLowerCase())) { //check if the name exist
        sendPokemon(pokemon.toLowerCase());
      } else if (pokemon.toLowerCase() === "trepuec") { //trepuec
        message.reply(
          "La centrale à la fin, je vous le dis tout de suite, Mr Leclerc il vas arriver ça vas faire wow wow wow wow"
        );
        message.channel.send(
          "https://cdn.discordapp.com/attachments/492828685217431553/888620797449617438/oie_185124SSdPVhk7.gif"
        );
      } else if (pokemon.toLowerCase() === "ewen") { //ewen
        message.reply("Ewen");
        message.channel.send(
          "https://cdn.discordapp.com/attachments/492828685217431553/888622310880325682/unknown.png"
        );
      } else { //does not exist
        message.reply("Ce pokemon n'existe pas.");
      }
    } else { //pokemon by number
      if (pokemon <= 898 && pokemon >= 1) { //in range
        sendPokemon(Math.round(pokemon));
      } else { //not in range
        message.reply(
          "Il n'existe que 898 pokemon à ce jour, choisis un pokemon existant !"
        );
      }
    }
  },
};
