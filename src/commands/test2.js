const Discord = require("discord.js");

module.exports.run = async (bot, message, args,channel,prefix) => { 

if (!args) return message.reply("You must have something to vote for!")
if (!message.content.includes("?")) return message.reply("Include a ? in your vote!")

message.channel.send(`:ballot_box:  ${message.author.username} started a vote! React to my next message to vote on it. :ballot_box: `);

const pollTopic = await message.channel.send(message.content.slice(2));
await pollTopic.react(`✅`);
await pollTopic.react(`⛔`);

// Create a reaction collector

const filter = (reaction) => reaction.emoji.name === '✅';
const collector = pollTopic.createReactionCollector(filter);

collector.on('collect', r => {

    console.log(`Collected ${r.emoji.name}`)
    console.log(`${r.emoji.size}`)
    
});

collector.on('end', collected => {


    console.log(`Collected ${collected.size} items`)

});

}

module.exports.help = {

    name : "test2"
  
}