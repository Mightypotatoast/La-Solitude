const { MessageEmbed } = require('discord.js');
const db = require('../../Models/infraction');
const { errorEmbed, warningEmbed } = require('../../util/Embeds');

module.exports = {
    name: 'warnings',
    description: 'View all warnings for a user',
    permission: 'ADMINISTRATOR',
    active : true,

    options: [
        {
            name: 'add',
            description: 'Add a warning to a user',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'target',
                    description: 'The user to add a warning to',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'The reason for the warning',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'evidence',
                    description: 'Evidence for the warning',
                    type: 'STRING',
                    required: false,
                },
            ]
        },
        {
            name: 'check',
            description: 'Check a user\'s warnings',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'target',
                    description: 'The user to check',
                    type: 'USER',
                    required: true,
                },
            ]
        },
        {
            name: 'remove',
            description: 'Remove a warning from a user',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'target',
                    description: 'The user to remove a warning from',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'warn-id',
                    description: 'The ID of the warning to remove',
                    type: 'NUMBER',
                    required: true,
                },
            ]
        },
        {
            name: 'clear',
            description: 'Clear all warnings from a user',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'target',
                    description: 'The user to clear all warnings from',
                    type: 'USER',
                    required: true,
                },
            ]
        },

    ],

    async execute(interaction) {
        
        const Sub = interaction.options.getSubcommand(["add", "check", "remove", "clear"]);

        const Target = interaction.options.getMember("target");
        const Reason = interaction.options.getString("reason");
        const Evidence = interaction.options.getString("evidence") || "None";
        const WarnID = interaction.options.getNumber("warn-id") - 1;
        const WarnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

        switch (Sub) {

            //! Add a warning

            case "add":
                if (!Target) return interaction.reply({ embeds: [errorEmbed().setDescription("You must specify a user to add a warning to!")] });
                if (!Reason) return interaction.reply({ embeds: [errorEmbed().setDescription("You must specify a reason for the warning!")] });

                db.findOne(
                    {
                        GuildID: interaction.guilId,
                        UserID: Target.id,
                        UserTag: Target.user.tag
                    },

                    async (err, data) => {
                        if (err) trow(err);
                        if (!data) {
                            data = new db({
                                GuildID: interaction.guilId,
                                GuildName: message.guild.name,
                                UserID: Target.id,
                                UserTag: Target.user.tag,
                                WarnData: [
                                    {
                                        ExecuterID: interaction.user.id,
                                        ExecuterTag: interaction.user.tag,
                                        Reason: Reason,
                                        Evidence: Evidence,
                                        Date: WarnDate,
                                    }
                                ],
                            });
                        }
                        
                        else {
                            data.WarnData.push({
                                ExecuterID: interaction.user.id,
                                ExecuterTag: interaction.user.tag,
                                Reason: Reason,
                                Evidence: Evidence,
                                Date: WarnDate,
                            });    
                        }

                        data.save();

                    });
                interaction.reply(
                    {
                        embeds: [
                            warningEmbed()
                                .setDescription(`Warning Added: ${Target.tag}  |  ||${Target.id}||`)
                                .addField("Reason", Reason)
                                .addField("Evidence", Evidence)
                        ]
                    }
                )
                break;
            
            
            //! Check Warnings
            
            case "check":
                if (!Target) return message.reply({embeds : [ errorEmbed().setDescription("You must specify a user to check!")]});

                db.findOne({
                    GuildID: interaction.guilId,
                    UserID: Target.id,
                    UserTag: Target.user.tag
                }, async (err, data) => {
                    if (err) throw err;
                    if (!data || data.Content.length === 0) return interaction.reply({ embeds: [warningEmbed().setDescription("That user has no warnings!")]});

                    let Warnings = [];

                    for (let i = 0; i < data.Content.length; i++) {
                        Warnings.push(
                            `\`${i + 1}\` - ${data.Content[i].Reason} | ${data.Content[i].Evidence} | ${data.Content[i].Date}`
                        );
                    }
                    interaction.reply(
                        {
                            embeds: [
                                warningEmbed()
                                    .setDescription(`Warnings for ${Target.user.tag}`)
                                    .addField("Warnings :", Warnings.join("\n"))
                            ]
                        }
                    )
                })








                break;
            
            //! Remove a warning
            case "remove":

                if (!Target) return message.reply({ embeds: [errorEmbed().setDescription("You must specify a user to remove a warning from!")] });
                if (!WarnID) return message.reply({ embeds: [errorEmbed().setDescription("You must specify a warning ID to remove!")] });
                
                db.findOne(
                    {
                        GuildID: interaction.guilId,
                        UserID: Target.id,
                        UserTag: Target.user.tag
                    },
                    async (err, data) => {
                        if (err) throw err;
                        if (!data) return interaction.reply({ embeds: [warningEmbed().setDescription("That user has no warnings!")] });
                        if (WarnID > data.Content.length) return interaction.reply({ embeds: [warningEmbed().setDescription("That warning ID does not exist!")] });

                        data.Content.splice(WarnID, 1);

                        interaction.reply(
                            {
                                embeds: [
                                    warningEmbed().setDescription(`Warning n°${WarnID + 1} Removed: ${Target.user.tag}`)
                                ]
                            }
                        )
                        data.save();
                    });



                break;
            
            //! Clear all warnings
            case "clear":
                if (!Target) return interaction.reply({ embeds: [errorEmbed().setDescription("You must specify a user to clear all warnings from!")] });

                db.findOne(
                    {
                        GuildID: interaction.guilId,
                        UserID: Target.id,
                        UserTag: Target.user.tag
                    },
                    async (err, data) => {
                        if (err) throw err;
                        if (!data) return interaction.reply({ embeds: [warningEmbed().setDescription("That user has no warnings!")] });
                        else {
                            await db.findOneAndDelete({
                                GuildID: interaction.guilId,
                                UserID: Target.id,
                                UserTag: Target.user.tag
                            });
                            interaction.reply(
                                {
                                    embeds: [
                                        warningEmbed()
                                            .setDescription(`All warnings cleared for ${Target.user.tag}`)
                                    ]
                                }
                            )
                        }

                    });

                break;
            
        }


    }
}