require("dotenv").config();
//const Distube = require("distube");
const fs = require("fs");
const path = require("node:path");

const { loadEvents } = require("./Handlers/Events")
const { loadCommands } = require("./Handlers/Commands")

const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require("discord.js");

const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits
const {User, Message, GuildMember, ThreadMember} = Partials

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember] 
});

client.commands = new Collection()


client
    .login(process.env.DISCORD_TOKEN)
    .then(()=> {
        loadEvents(client);
        loadCommands(client);
    })
    .catch((err) => { console.log(err); });
        
    
    
    
    /*client.distube = new Distube.default(client, {
            searchSongs: 0,
            emitNewSongOnly: true,
        });*/
        
        /*******************************************/
        //       Add commands in collection          //
        /*******************************************/
