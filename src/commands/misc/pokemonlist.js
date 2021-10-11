const Discord = require("discord.js");
// const https = require("https");
// const axios = require("axios");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

module.exports = {
  
  name: "pokemonlist",
  description: "display 1 to 10 random pokemon",
  permission: "ADMINISTRATOR",

  options: [
    {
      name: "limit",
      description: "Choose 1-10 random pokemon",
      type: "STRING",
      required : true,
    },
    // { name: "limit", type: "int" },
  ],



  async execute(message) {
    var interval = {
      limit: message.options.getString("limit"),
      offset: 34,
    }; 

    if (!isNaN(parseInt(message.options.getString("limit")))) {
      if (message.options.getString("limit") >= 1 && message.options.getString("limit") <= 10) {
        P.getPokemonsList(interval).then(function (response) {
          let name = response.results;
          message.reply(`La liste de ${message.options.getString("limit")} Pokémon`);
          name.forEach((element) => { 
            // console.log(element.name);
            P.getPokemonByName(element.name) // with Promise
              .then(function (response) {
                // console.log(response.name);
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

