const Discord = require("discord.js");

module.exports.run = async (bot, message, args,channel,prefix) => {   
   
    var rol = message.member.guild.roles.find(role => role.name === "Des gens")
            
    if(!rol){  
        message.reply("role not found");
        message.member.guild.createRole({ "name" : "Des gens"});  
        message.reply("role created");
    }

    rol = message.member.guild.roles.find(role => role.name === "Des gens")
    message.member.addRole(rol);
    message.reply("role added")
            
           
}

module.exports.help = {

    name : "test"
  
}