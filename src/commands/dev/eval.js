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
  
  options: [
    {
      name: 'code',
      description: "Code",
      type: "STRING",
      required : true
    },
  ],



  async execute(message) {

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