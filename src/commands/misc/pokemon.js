const { Command } = require("discord-akairo");
const Discord = require("discord.js");
// const https = require("https");
// const axios = require("axios");
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
        // { id: "limit", type: "int" },
      ],
    });
  }

  async exec(message, args) {
    if (args.pokemon <= 898 && args.pokemon >= 1) {
      P.getPokemonByName(args.pokemon) // with Promise
        .then(function (response) {
          // console.log(response.name);
          message.channel.send(response.name);
          message.channel.send(response.sprites.front_default);
        });
    } else if (args.pokemon > 898 || args.pokemon < 1) {
      message.channel.send(
        "Il n'exsite que 898 pokemon à ce jour, choisis un pokemon existant !"
      );
    }

    // if (!isNaN(parseInt(args.pokemon))) {

    //   var interval = {
    //     limit: args.pokemon,
    //     offset: 34,
    //   };

    //   P.getPokemonsList(interval).then(function (response) {
    //     let name = response.results;
    //     name.forEach((element) => {
    //       // console.log(element.name);
    //       P.getPokemonByName(element.name) // with Promise
    //         .then(function (response) {
    //           // console.log(response.name);
    //           message.channel.send(response.name);
    //           message.channel.send(response.sprites.front_default);
    //         });
    //     });
    //   });
    // }

    // let pokemonArg = args.pokemon;
    // let response = await axios.get(
    //   "https://pokeapi.co/api/v2/pokemon/" + pokemonArg
    // );
    // // console.log(response.data);
    // let pokemon = response.data;
    // pokemon.results.forEach((element) => {
    //   //   console.log(element.name);
    //   message.channel.send(element.name);
    //   //   message.channel.send(element.sprites);
    // });
    // // console.log(pokemon);
    // // message.channel.send(pokemon.name);
    // // message.channel.send(pokemon.sprites.front_default);
  }
}

module.exports = PokemonCommand;
