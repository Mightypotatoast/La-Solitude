const { Command } = require("discord-akairo");
const Discord = require("discord.js");
// const https = require("https");
// const axios = require("axios");
const config = require("../../config.json");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

class PokemonCommand extends Command {
  constructor() {
    super("pokemon", {
      aliases: ["pokemon"],
      args: [
        {
          id: "pokemon",
          type: null,
        },
      ],
    });
  }

  async exec(message, args) {
    let pokemon = args.pokemon;

    const sendPokemon = (pokemon) => {
      P.getPokemonByName(pokemon)
        .then(function (response) {
          console.log(response.name);

          let isAnimated =
            response.sprites.versions["generation-v"]["black-white"].animated
              .front_default;

          if (isAnimated != null) {
            message.channel.send(response.name);
            // message.channel.send(response.sprites.front_default);
            message.channel.send(isAnimated);
          } else {
            message.channel.send(response.name);
            // message.channel.send(response.sprites.front_default);
            message.channel.send(response.sprites.front_default);
          }
        })
        .catch(function (error) {
          console.log("There was an ERROR: ", error);
          message.channel.send(error);
        });
    };

    let tmp = config.pokemonNames.join("~").toLowerCase();
    let pokemonNames = tmp.split("~");

    if (typeof pokemon === "object") {
      message.channel.send("Invalid Arguments");
    } else {
      if (isNaN(pokemon)) {
        if (pokemonNames.includes(pokemon.toLowerCase())) {
          if (condition) {
          }
          sendPokemon(pokemon.toLowerCase());
        } else {
          message.channel.send("Ce pokemon n'existe pas.");
        }
      }

      if (!isNaN(pokemon)) {
        if (pokemon <= 898 && pokemon >= 1) {
          sendPokemon(Math.round(pokemon));
        } else {
          message.channel.send(
            "Il n'existe que 898 pokemon à ce jour, choisis un pokemon existant !"
          );
        }
      }
    }
  }
}

module.exports = PokemonCommand;
