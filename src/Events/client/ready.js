const mongoose = require("mongoose")
const database = process.env.DATABASE

module.exports = {
    
    name: 'ready',
    once: true,

    execute(bot) {

        var memberCount = bot.users.cache.size;
        var guildCount = bot.guilds.cache.size;
        
        console.log("--------------------------------------\n");
        console.log(`${bot.user.username} est prêt !\n`);
        //console.log(`[!] Le préfix actuelle: ${process.env.PREFIX}`)
        console.log(`[!] Nombre de serveurs: ${guildCount}`)
        console.log(`[!] Nombre total de membres: ${memberCount}`);
        console.log(`[!] Nombre de commandes initialisées: ${bot.commands.size}`);
        console.log("\n--------------------------------------");



        if (!database) return console.log("MongoDB's link is not set");

        mongoose.connect(database, {

            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then(() => {
            console.log("\nThe client is now connected to the database !\n");
        }).catch((err) => {
            console.log(err);
        });
        
    }
}