const { MessageEmbed, CommandInteraction } = require("discord.js");
const db = require("../../Models/channels");

module.exports = {
    name: "set",
    description: "Set the channel for the bot to send messages to.",
    permission: "ADMINISTRATOR",
  
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
        
        switch (message.options.getString("channel")) {
            case "log":
                db.findOne({
                    GuildID: message.guild.id
                }, async (err, data) => {
                    if (err) throw err
                    if (!data || !data.LogChannelID) {
                        data = new db({
                            GuildID: guild.id,
                            LogChannelID: message.channel.id
                            
                        })
                    } else {
                        data.LogChannelID = message.channel.id
                    }
                    data.save()
                })
                break;
            case "report":
                db.update(message.guild.id, "report", message.channel.id);
                break;
            case "welcome":
                break
            case "goodbye":
                break


        }
    }
};
