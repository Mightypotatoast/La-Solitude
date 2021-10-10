const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    
    name: 'inviteCreate',
    once: false,

    execute(invite) {

        
        let inviteDate = invite.createdAt
        let inviteExpireDate = invite.expiresAt

        let Expiration

        if (inviteExpireDate == null) {

            Expiration = "Jamais"

        } else {

            Expiration = `${inviteExpireDate.getDate()}/${inviteExpireDate.getMonth()+1}/${inviteExpireDate.getFullYear()} à ${inviteExpireDate.getHours()}:${String(inviteExpireDate.getMinutes()).padStart(2, '0')}`
        }

        const inviteEmbed = new MessageEmbed()
            .setTitle("**Une invitation a été créée !**")
            .setColor("#3CE73C")
            .setDescription('**Crée le :** '+`${inviteDate.getDate()}/${inviteDate.getMonth()+1}/${inviteDate.getFullYear()} à ${inviteDate.getHours()}:${String(inviteDate.getMinutes()).padStart(2, '0')}` )
            .addField('Par', `${invite.inviter}`, true)
            .addField('Utilisation Max', (invite.maxUses === 0 ) ? 'Infini': `${invite.maxUses}`, true)
            .addField('Channel visé : ', invite.channel.name, true)
            .addField('Expire le :',  Expiration)
            .addField('URL', invite.url)
            .setTimestamp()

        

        invite.guild.channels.cache.get(config.channel.logID).send({ embeds : [inviteEmbed] });
    
       
    }
}