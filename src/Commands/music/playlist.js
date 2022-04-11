const { MessageEmbed, CommandInteraction } = require("discord.js");
const { errorEmbed, setChannelEmbed } = require("../../util/Embeds");
const db = require("../../Models/channels");

module.exports = {
    name: "playlist",
    description: "Affiche vos playlist disponible",
    permission: "ADMINISTRATOR",
    active: true,
    /**
     *
     * @param {CommandInteraction} message
     */
    async execute(message) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply({
                embeds: [
                    errorEmbed().setDescription(
                        "Vous devez être un Administrateur pour utiliser cette commande"
                    ),
                ],
                ephemeral: true,
            });
        }

        switch (message.options.getString("channel")) {
            case "log":
                db.findOne(
                    {
                        GuildID: message.guild.id,
                    },
                    async (err, data) => {
                        if (err) throw err;
                        if (!data) {
                            data = new db({
                                GuildID: message.guild.id,
                                LogChannelID: message.channel.id,
                            });
                        } else {
                            data.LogChannelID = message.channel.id;
                        }
                        data.save();
                    }
                );
                break;

            case "report":
                db.findOne(
                    {
                        GuildID: message.guild.id,
                    },
                    async (err, data) => {
                        if (err) throw err;
                        if (!data) {
                            data = new db({
                                GuildID: message.guild.id,
                                ReportChannelID: message.channel.id,
                            });
                        } else {
                            data.ReportChannelID = message.channel.id;
                        }
                        data.save();
                    }
                );
                break;

            case "welcome":
                db.findOne(
                    {
                        GuildID: message.guild.id,
                    },
                    async (err, data) => {
                        if (err) throw err;
                        if (!data) {
                            data = new db({
                                GuildID: message.guild.id,
                                WelcomeChannelID: message.channel.id,
                            });
                        } else {
                            data.WelcomeChannelID = message.channel.id;
                        }
                        data.save();
                    }
                );
                break;

            case "goodbye":
                db.findOne(
                    {
                        GuildID: message.guild.id,
                    },
                    async (err, data) => {
                        if (err) throw err;
                        if (!data) {
                            data = new db({
                                GuildID: message.guild.id,
                                ByeChannelID: message.channel.id,
                            });
                        } else {
                            data.ByeChannelID = message.channel.id;
                        }
                        data.save();
                    }
                );
                break;

            case "music":
                db.findOne(
                    {
                        GuildID: message.guild.id,
                    },
                    async (err, data) => {
                        if (err) throw err;
                        if (!data) {
                            data = new db({
                                GuildID: message.guild.id,
                                MusicChannelID: message.channel.id,
                            });
                        } else {
                            data.MusicChannelID = message.channel.id;
                        }
                        data.save();
                    }
                );
                break;
        }

        message.reply({
            embeds: [
                setChannelEmbed().setDescription(
                    `le salon \`${message.options.getString(
                        "channel"
                    )}\` est maintenant défini dans le salon : ${
                        message.channel
                    }  `
                ),
            ],
            ephemeral: true,
        });
    },
};
