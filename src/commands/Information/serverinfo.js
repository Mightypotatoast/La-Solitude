const Discord = require('discord.js')

module.exports = {

    name: "serverinfo",
    description: "Some informations of the server",
    permission: "ADMINISTRATOR",
    active:true,

    async execute(message) {

        let CreatedDate = message.guild.createdAt;
        let Joindate = message.member.joinedAt;

        let icon = message.guild.iconURL();

        let servemb = new Discord.MessageEmbed()
            .setTitle(":clipboard: INFORMATION SUR LE SERVEUR :clipboard:")
            .setColor("#FF6800")
            .setThumbnail(icon)
            .addField("Nom du Serveur : ", `${message.guild.name}`)
            .addField("Crée le : ", `${CreatedDate.getDate()}/${CreatedDate.getMonth()+1}/${CreatedDate.getFullYear()} à ${CreatedDate.getHours()}h${String(CreatedDate.getMinutes()).padStart(2, '0')}min${String(CreatedDate.getSeconds()).padStart(2, '0')}s`)
            .addField("Par : ", `${ await message.guild.fetchOwner() }`)
            .addField("Tu as rejoins le : ", `${Joindate.getDate()}/${Joindate.getMonth()+1}/${Joindate.getFullYear()} à ${Joindate.getHours()}h${String(Joindate.getMinutes()).padStart(2, '0')}min${String(Joindate.getSeconds()).padStart(2, '0')}s`)
            .addField("Total des membres :", `${message.guild.memberCount} `)
            
    
        return message.reply({embeds : [servemb]})

    }
}