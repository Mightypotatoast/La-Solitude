const {
    CommandInteraction,
    ActionRowBuilder,
    MessageSelectMenu,
} = require("discord.js");
const { errorEmbed, successEmbed, musicEmbed } = require("../../util/Embeds");
const db = require("../../Models/commands");
const glob = require("glob");
const { SortObjectArray } = require("../../util/functions");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("command")
        .setDescription("Activation ou rechargement des commandes")
        .addStringOption((option) =>
            option
                .setName("mode")
                .setDescription("Modifier l'état d'une commande")
                .setRequired(true)
                .addChoices(
                    { name: "enable", value: "0" },
                    { name: "disable", value: "1" },
                    { name: "reload", value: "2" }
                )
        ),

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(message) {
        const { options, guild } = message;

        const Sub = options.getSubcommand(["enable", "disable", "reload"]);

        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.reply({
                embeds: [
                    errorEmbed().setDescription(
                        "Vous devez être Administrateur pour utiliser cette commande"
                    ),
                ],
                ephemeral: true,
            });

        let Commandfiles = [];

        glob(`${__dirname}/../**/*.js`, (err, files) => {
            if (err)
                return message.editReply({
                    embed: [errorEmbed().setDescription(err)],
                    ephemeral: true,
                });

            files.forEach((file) => {
                let cmd = require(file);
                Commandfiles.push({
                    label: cmd.name,
                    description: cmd.description,
                    value: file,
                });
            });
        });

        SortObjectArray(Commandfiles, "label");

        await message.reply({
            embeds: [musicEmbed().setDescription("⏳ Chargement ...")],
            ephemeral: true,
        });

        switch (Sub) {
            case "enable":
                break;
            case "disable":
                const rows = [];

                let i = 0,
                    j = 1;
                do {
                    let row = new ActionRowBuilder().addComponents(
                        new MessageSelectMenu()
                            .setCustomId(`disable-${j}`)
                            .setPlaceholder("Rien n'est sélectionné")
                            .addOptions(
                                Commandfiles.slice(
                                    i,
                                    Commandfiles.length < i
                                        ? Commandfiles.length - 1
                                        : i + 24
                                )
                            )
                    );
                    rows.push(row);
                    i += 25;
                    j++;
                } while (Commandfiles.length > i);

                message.editReply({
                    embeds: [
                        musicEmbed().setDescription(
                            `Sélectionner une ou plusieurs commandes à désactiver ⤵️`
                        ),
                    ],
                    components: rows,
                    ephemeral: true,
                });

                /*db.findOne({ GuildID: guild.id }, (err, data) => {
                    if(err) return interaction.editReply(errorEmbed().setDescription("An error occured."))
                    if (data) {
                        if (data.CommandData.includes()) {
                            
                        }


                    } else {
                        return interaction.editReply({embeds : [errorEmbed().setDescription("This guild doesn't have any commands.")]})
                    }
                   

                    data.save().catch(err => {
                        return interaction.editReply({embeds :[errorEmbed().setDescription("An error occured.")]})
                    })
                })*/

                break;

            case "reload":
                if (message.member.id !== "206905331366756353")
                    return message.editReply({
                        embed: [
                            errorEmbed().setDescription(
                                "Vous n'avez pas la permission d'utiliser cette commande : **`BOT OWNER ONLY`**"
                            ),
                        ],
                        ephemeral: true,
                    });

                Commandfiles.forEach((file) => {
                    delete require.cache[require.resolve(file.value)];

                    const command = require(file.value);
                    console.log(`Reloaded /${file.label}`);

                    if (command.name) {
                        message.client.commands.set(command.name, command);
                    }
                });

                message.editReply({
                    embeds: [
                        successEmbed().setDescription(
                            "Toutes les commandes ont été rechargées"
                        ),
                    ],
                    ephemeral: true,
                });

                break;
        }
    },
};
