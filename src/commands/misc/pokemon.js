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
        { id: "pokemon", type: "string" },
        { id: "limit", type: "int" },
      ],
    });
  }

  async exec(message, args) {
    P.getPokemonByName(args.pokemon) // with Promise
      .then(function (response) {
        // console.log(response.name);
        message.channel.send(response.name);
        message.channel.send(response.sprites.front_default);
      });

    // var interval = {
    //   limit: args.limit,
    //   offset: 34,
    // };

    // P.getPokemonsList(interval).then(function (response) {
    //   let name = response.results;
    //   name.forEach((element) => {
    //     // console.log(element.name);
    //     P.getPokemonByName(element.name) // with Promise
    //       .then(function (response) {
    //         // console.log(response.name);
    //         message.channel.send(response.name);
    //         message.channel.send(response.sprites.front_default);
    //       });
    //   });
    // });

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
