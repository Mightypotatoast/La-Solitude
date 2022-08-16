const { ActionRow, MessageButton } = require("discord.js");

module.exports = {
    //------------------------ Music -------------------------------
    musicButtonRow: () => {
        return new ActionRow().addComponents(
            new MessageButton()
                .setLabel("⏮️")
                .setCustomId(`previous`)
                .setStyle("SECONDARY"),
            new MessageButton()
                .setLabel("⏯️")
                .setCustomId(`pause`)
                .setStyle("SECONDARY"),
            new MessageButton()
                .setLabel("⏭️")
                .setCustomId(`skip`)
                .setStyle("SECONDARY")
        );
    },

    musicButtonRow2: () => {
        return new ActionRow().addComponents(
            new MessageButton()
                .setLabel("🔀")
                .setCustomId(`shuffle`)
                .setStyle("SECONDARY"),
            new MessageButton()
                .setLabel("🔁")
                .setCustomId(`repeat`)
                .setStyle("SECONDARY"),
            new MessageButton()
                .setLabel("❤️")
                .setCustomId(`like`)
                .setStyle("SECONDARY")
        );
    },
};
