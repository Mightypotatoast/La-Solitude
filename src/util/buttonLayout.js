const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    

//------------------------ Music -------------------------------    
     musicButtonRow: () => {
        return new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏮️')
                    .setCustomId(`previous`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏯️')
                    .setCustomId(`pause`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏩')
                    .setCustomId(`skip`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('🔀')
                    .setCustomId(`shuffle`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('🔁')
                   .setCustomId(`repeat`)
					.setStyle('SECONDARY'),  
			)},

//----------------------           -------------------------------



}