const { Command } = require("discord-akairo");

class PokemonCommand extends Command {
  constructor() {
    super("pokemon", {
      aliases: ["pokemon"],
    });
  }

  exec(message) {}
}

module.exports = PokemonCommand;
