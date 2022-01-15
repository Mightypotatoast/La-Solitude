const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { errorEmbed } = require("../../util/Embeds");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // eslint-disable-line
const cheerio = require('cheerio');




module.exports = {
    name: "chuck",
    description: "Chuck Norris facts",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "combien",
            description: "Le maximum de Chuck Norris facts à afficher.",
            type: "NUMBER",
            required: false
        }

    ],

    /**
     * 
     * 
     * @param {CommandInteraction} message
     * @param {Client} client
     * 
     */
    async execute(message, client) {


        let MaxNUM = message.options.getNumber("combien") || 1;

        await message.deferReply();
        
        let MaxChuck = 231461;
        let getRnd = () => Math.floor(Math.random() * MaxChuck) + 1;

        await message.editReply({embeds : [{description : "⏳ Chargement... ", color:0xFF6800}]})
            .then(async (resultMessage) => {

                
                const fetchAPI = async () => {

                    let status
                    const response = await fetch(`https://chucknorrisfacts.fr/facts/random`, {
                            method: "GET",
                        });
                        
                    
                    return await response.text()
                    
                }

                const data = await fetchAPI();

                const $ = cheerio.load(data);

                let facts = []
                

                
                for (let i = 0; i < MaxNUM; i++) { 
                    let fact = $('.card-text').toArray()[i].children[0].data
                    let note = $("span").toArray()[i].children[0].data
                    let id = $("a").toArray().filter(a => a.attribs.href !== undefined && a.attribs.href.includes("/voir_fact/"))[i].children[0].data
                    
                    facts.push({
                        id: id,
                        fact: fact,
                        note: note,
                    })

                }
                
                const chuckEmbed = new MessageEmbed()
                    .setTitle("Chuck Norris Facts")
                    .setColor(0xFF6800)
                    .setThumbnail("https://chucknorrisfacts.fr/static/img/cn_pa.png")
                    .setFooter("Chuck Norris Facts")
                    .setTimestamp();
                
                facts.forEach(f => {
                    chuckEmbed.addField(`\`Fact ${f.id}\``, `${f.fact}\n_Note: ${f.note}_`)
                })
                
                
                resultMessage.edit({embeds : [chuckEmbed]})
            });
    
    }
}
