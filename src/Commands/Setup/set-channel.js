const { MessageEmbed, CommandInteraction } = require("discord.js");
const { errorEmbed, setChannelEmbed } = require("../../util/Embeds");
const db = require("../../Models/channels");


module.exports = {
    name: "set-channel",
    description: "Set the channel for the bot to send messages to.",
    permission: "ADMINISTRATOR",
    active: true,
  
    options: [
        {
            name: "channel",
            description: "The channel to set the bot to send messages to.",
            type: "STRING",
            choices: [
                {
                    name: "log",
                    value : "log"
                },
                {
                    name: "report",
                    value : "report"
                },
                {
                    name: "welcome",
                    value : "welcome"
                },
                {
                    name: "goodbye",
                    value : "goodbye"
                }
            ],
            required: true,
        }
    ],
    /**
     * 
     * @param {CommandInteraction} message 
     */
    async execute(message) {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply({embeds : [errorEmbed().setDescription("You need to be an Administrator to use this command.")], ephemeral: true});
        }

        
        
        switch (message.options.getString("channel")) {
            case "log":
                db.findOne({
                    GuildID: message.guild.id
                }, async (err, data) => {
                    if (err) throw err
                    if (!data) {
                        data = new db({
                            GuildID: message.guild.id,
                            LogChannelID: message.channel.id
                            
                        })
                    } else {
                        data.LogChannelID = message.channel.id
                    }
                    data.save()
                })

                break;
            case "report":
                db.findOne({
                    GuildID: message.guild.id
                }, async (err, data) => {
                    if (err) throw err
                    if (!data) {
                        data = new db({
                            GuildID: message.guild.id,
                            ReportChannelID: message.channel.id
                            
                        })
                    } else {
                        data.ReportChannelID = message.channel.id
                    }
                    data.save()
                })
                break;
            case "welcome":

                db.findOne({
                    GuildID: message.guild.id
                },
                    async (err, data) => {
                    if (err) throw err
                    if (!data) {
                        data = new db({
                            GuildID: message.guild.id,
                            WelcomeChannelID: message.channel.id
                            
                        })
                    } else {
                        data.WelcomeChannelID = message.channel.id
                    }
                    data.save()
                })
                
                break
            case "goodbye":

                db.findOne({
                    GuildID: message.guild.id
                }, async (err, data) => {
                    if (err) throw err
                    if (!data) {
                        data = new db({
                            GuildID: message.guild.id,
                            ByeChannelID: message.channel.id
                            
                        })
                    } else {
                        data.ByeChannelID = message.channel.id
                    }
                    data.save()
                })
                
                break;


        }

        message.reply({embeds : [setChannelEmbed().setDescription(`The ${message.options.getString("channel")} channel is now set in : ${message.channel}  `)], ephemeral: true});
    }
};
