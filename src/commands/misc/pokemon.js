const Discord = require("discord.js");
// const https = require("https");
// const axios = require("axios");
const config = require("../../config.json");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

module.exports = {
  
  name: "pokemon",
  description: "Choice your Pokemon",
  permission: "ADMINISTRATOR",

  options: [
    {
      name: "pokemon",
      description:"Name or number of a pokemon",
      type: "STRING",
      required: true,
    },
  ],

  
  async execute(message) {
    let pokemon = message.options.getString('pokemon');

    const sendPokemon = (pokemon) => {
      P.getPokemonByName(pokemon)
        .then(function (response) {
          console.log(response.name);

          let isAnimated =
            response.sprites.versions["generation-v"]["black-white"].animated
              .front_default;

          if (isAnimated != null) {
            message.reply(response.name);
            // message.reply(response.sprites.front_default);
            message.channel.send(isAnimated);
          } else {
            message.reply(response.name);
            // message.reply(response.sprites.front_default);
            message.channel.send(response.sprites.front_default);
          }
        })
        .catch(function (error) {
          console.log("There was an ERROR: ", error);
          message.reply(error);
        });
    };

    let tmp = config.pokemonNames.join("~").toLowerCase();
    let pokemonNames = tmp.split("~");

    if (typeof pokemon === "object") {
      message.reply("Invalid Arguments");
    } else {
      if (isNaN(pokemon)) {
        if (pokemonNames.includes(pokemon.toLowerCase())) {
          sendPokemon(pokemon.toLowerCase());
        } else if (pokemon.toLowerCase() === "trepuec") {
          message.reply(
            "La centrale à la fin, je vous le dis tout de suite, Mr Leclerc il vas arriver ça vas faire wow wow wow wow"
          );
          message.channel.send(
            "https://cdn.discordapp.com/attachments/492828685217431553/888620797449617438/oie_185124SSdPVhk7.gif"
          );
        } else if (pokemon.toLowerCase() === "ewen") {
          message.reply("ewen");
          message.channel.send(
            "https://cdn.discordapp.com/attachments/492828685217431553/888622310880325682/unknown.png"
          );
        } else {
          message.reply("Ce pokemon n'existe pas.");
        }
      }

      if (!isNaN(pokemon)) {
        if (pokemon <= 898 && pokemon >= 1) {
          sendPokemon(Math.round(pokemon));
        } else {
          message.reply(
            "Il n'existe que 898 pokemon à ce jour, choisis un pokemon existant !"
          );
        }
      }
    }
  }
}

