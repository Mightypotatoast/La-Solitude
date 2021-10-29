const mongoose = require("mongoose")
const database = process.env.DATABASE

module.exports = {
    
    name: 'ready',
    once: true,

    execute(bot) {

        var memberCount = bot.users.cache.size;
        var guildCount = bot.guilds.cache.size;
        
        console.log("--------------------------------------");
        console.log('[!] Connexion en cours... \n[!] Veuillez Patienté! \n[!] Le préfix actuelle:  ' + process.env.PREFIX + "\n[!] Nombre de serveurs: " + guildCount + "\n[!] Nombre de membres: " + memberCount + '\n');
        
        if (!database) return console.log("MongoDB's link is not set");

        mongoose.connect(database, {

            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then(() => {
            console.log("\nThe client is now connected to the database !\n");
        }).catch((err) => {
            console.log(err);
        })
        
    }
}