const { CommandInteraction } = require("discord.js");
const { errorEmbed } = require("../../util/Embeds");

const clean = text => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

module.exports = {
  name: "eval",
  description: "eval",
  permission: "ADMINISTRATOR",
  active: false,
  
  options: [
    {
      name: 'code',
      description: "Code",
      type: "STRING",
      required : true
    },
  ],

  /**
   * @param {CommandInteraction} message
   */

  async execute(message) {
    
    if (message.author.id !== "206905331366756353") return message.reply({ embed: [errorEmbed().setDescription("You need to be the owner of this server!")] });

    let code = message.options.getString("code")
    
    try {
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}
;