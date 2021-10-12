const Discord = require("discord.js");
// const https = require("https");
// const axios = require("axios");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

module.exports = {
  
  name: "pokemonlist",
  description: "Affiche 1 à 10 pokemon random",
  permission: "ADMINISTRATOR",
  active:true,

  options: [
    {
      name: "limit",
      description: "Choisis une limite de pokemon entre 1 et 10 à afficher",
      type: "STRING",
      required : true,
    },
  ],

  async execute(message) {

    let limit = message.options.getString("limit");
    
    var interval = {
      limit: message.options.getString("limit"),
      offset: Math.random() * 100 * limit,
    };

    if (!isNaN(interval.limit)) {
      if (interval.limit >= 1 && interval.limit <= 10) {
        P.getPokemonsList(interval).then(function (response) {
          message.reply(`La liste de ${interval.limit} Pokémon`);
          response.results.forEach((pokemon) => { 
            P.getPokemonByName(pokemon.name)
              .then(function (response) {
                message.channel.send(response.name);
                message.channel.send(response.sprites.front_default);
              });
          });
        });
      } else {
        message.reply("Choisis un nombre entre 1 et 10 !");
      }
    } else {
      message.reply("not a number !");
    }

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

