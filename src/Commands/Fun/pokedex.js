const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const db = require("../../Models/my-pokedex")
const { errorEmbed, successEmbed } = require("../../util/Embeds")
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();


module.exports = {

    name: "pokedex",
    description: "My Pokedex",
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "init",
            description: "initialize your pokedex",
            type: "SUB_COMMAND",
            
        },

        {
            name: "add",
            description: "add a pokemon to your pokedex",
            type: "SUB_COMMAND_GROUP",
            options: [
                {
                    name: "by-names",
                    description: "add one or several pokemons by name",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "pokemon",
                            description: "the pokemon name",
                            type: "STRING",
                            required: true,
                        }
                    ],
                },
                {
                    name: "by-index-numbers",
                    description: "add one or several pokemons by index number",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "index",
                            description: "the pokemon index",
                            type: "NUMBER",
                            required: true,
                        }
                    ],
                },
                {
                    name: "by-index-group",
                    description: "add group of pokemon by index number",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "min",
                            description: "the minimum index",
                            type: "NUMBER",
                            required: true,
                        },
                        {
                            name: "max",
                            description: "the maximum index",
                            type: "NUMBER",
                            required: true,
                        }
                    ],
                },
            ]
        },


        {
            name: "remove",
            description: "remove a pokemon from your pokedex",
            type: "SUB_COMMAND_GROUP",
            options: [
                {
                    name: "by-names",
                    description: "add one or several pokemons by name",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "pokemon",
                            description: "the pokemon name",
                            type: "STRING",
                            required: true,
                        }
                    ],
                },
                {
                    name: "by-index-numbers",
                    description: "add one or several pokemons by index number",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "index",
                            description: "the pokemon index",
                            type: "NUMBER",
                            required: true,
                        }
                    ],
                },
                {
                    name: "by-index-group",
                    description: "add group of pokemon by index number",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "min",
                            description: "the minimum index",
                            type: "NUMBER",
                            required: true,
                        },
                        {
                            name: "max",
                            description: "the maximum index",
                            type: "NUMBER",
                            required: true,
                        }
                    ],
                },
            ]
        },

        {
            name: "view",
            description: "view your pokedex",
            type: "SUB_COMMAND",

        },
        
    ],

    /**
     * 
     * @param {CommandInteraction} message 
     * @param {Client} client 
     */
  
    async execute(message, client) {
        
        const { options, guild, member } = message
        
        let Sub = options.getSubcommand(["view", "init"])

        await message.deferReply()

        //! INITIALISATION DE LA BDD POKEDEX POUR LE USER

        if (Sub === "init") { 
            //if (message.member.permissions.has("ADMINISTRATOR")) { return message.editReply({ embed: [errorEmbed().setDescription("You need to be an administrator to use this command.")], ephemeral: true }) }
            
            let initEmbed = new MessageEmbed()
                .setTitle("Initialisation de votre pokedex...")
                .setColor("#000000")
                .setDescription("Veuillez indiquer la version de votre jeu")
                .setTimestamp()





            db.findOne({ UserID: member.id }, (err, doc) => {
                if (err) { return message.editReply({ embed: [errorEmbed().setDescription("An error occured while trying to find your pokedex.")], ephemeral: true }) }
                if (doc) {
                    return message.editReply({ embed: [new MessageEmbed().setDescription(`Your pokedex already exists.`)], ephemeral: true })
                }
            })
            let tempDB = {}
            let versions = []
            let pokedexs = []

            await P.getVersionGroupsList().then(res => { 

                res.results.forEach(version => {
                    let versionsBlacklist = ["colosseum","xd"]

                    if (!versionsBlacklist.includes(version.name)) {
                        versions.push({ label: "Pokemon " + version.name, value: version.name })
                    }
                })

                
            }).catch(err => { return message.editReply({ embed: [errorEmbed().setDescription("An error occured while trying to get the pokemon versions.")], ephemeral: true }) })



            let row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setOptions(versions)
                    .setCustomId("pokedex-version")
                    .setPlaceholder("Choisissez une version") 
            )

            m = await message.editReply({
                embeds: [ initEmbed ],
                components: [row]
            })
            const versionCollector = m.createMessageComponentCollector({
                type: "SELECT_MENU",
                time: 60000
            })

            versionCollector.on("collect", async (menu) => { 
                
                if (menu.user.id !== member.id) {
                    return menu.reply({
                        embeds: [errorEmbed().setDescription("C'est pas ton pokédex")],
                        ephemeral: true
                    })
                }
                                
                if (menu.customId === "pokedex-version") {

                    console.log();
                    tempDB.version = menu.values[0]

                    await P.getVersionGroupByName(menu.values[0]).then(res => { 

                        res.regions.forEach(region => { 
                            tempDB.regions = []
                            tempDB.regions.push(region.name)
                        })
                        tempDB.generations = res.generation.name
                        initEmbed.addFields(
                            { name: "Version", value: menu.values[0], inline: true },
                            { name: "Regions", value: `${tempDB.regions}`, inline: true },
                            { name: "Générations", value: res.generation.name, inline: true }
                        )
                        
                        let nationalBlacklist = ["lets-go","firered-leafgreen","red-blue","yellow", "gold-silver", "crystal"]
                        
                        if (!nationalBlacklist.includes(menu.values[0])) {
                            pokedexs.push({ label: "National", value: "national" })
                        }

                        if (res.pokedexes.length > 1) { 
                            pokedexs.push({ label: "Toutes régions", value: `all-regions` })
                        }

                        res.pokedexes.forEach(pokedex => {
                            pokedexs.push({ label: pokedex.name, value: pokedex.name })
                        })
                        
                        
                        
                        
                    }).catch(err => {
                        console.log(err);
                        return message.editReply({ embeds: [errorEmbed().setDescription(`${err}`)], components: [], ephemeral: true })
                        
                    })
                    
                    
                    await menu.deferUpdate()
                    versionCollector.stop()
                    
                    let row = new MessageActionRow().addComponents(
                        new MessageSelectMenu()
                            .setOptions(pokedexs)
                            .setCustomId("pokedex-type")
                            .setPlaceholder("Choisissez un pokedex")
                    )
                    await m.edit({
                        embeds: [initEmbed.setDescription("Veuillez indiquer un pokedex")],
                        components: [row]
                    })

                    const pokedexCollector = m.createMessageComponentCollector({
                        type: "SELECT_MENU",
                        time: 60000
                    })

                    pokedexCollector.on("collect", async (menu) => { 

                        if (menu.user.id !== member.id) {
                            return menu.reply({
                                embeds: [errorEmbed().setDescription("C'est pas ton pokédex")],
                                ephemeral: true
                            })
                        }
                        
                        if (menu.customId === "pokedex-type") {

                            tempDB.pokedex = menu.values[0]

                            initEmbed.addFields(
                                { name: "Pokedex", value: menu.values[0], inline: true }
                            )

                            await menu.deferUpdate()
                            pokedexCollector.stop()

                            let row = new MessageActionRow().addComponents(
                                new MessageSelectMenu()
                                    .setOptions([{ label: "Oui", value: "yes", emoji: "✔️" }, { label: "Non", value: "no", emoji: "❌" }])
                                    .setCustomId("pokedex-init-confirm")
                                    .setPlaceholder("Confirmer l'initialisation")
                            )

                            await m.edit({
                                embeds: [initEmbed.setDescription("\`\`\`Voulez-vous initialiser votre pokedex ?\`\`\`")],
                                components: [row]
                            })

                            const confirmCollector = m.createMessageComponentCollector({
                                type: "SELECT_MENU",
                                time: 60000
                            })

                            confirmCollector.on("collect", async (menu) => {

                                if (menu.user.id !== member.id) {
                                    return menu.reply({
                                        embeds: [errorEmbed().setDescription("C'est pas ton pokédex")],
                                        ephemeral: true
                                    })
                                }
                                if(menu.customId === "pokedex-init-confirm") {
                                    if (menu.values[0] === "yes") {
                                        
                                        await menu.deferUpdate()
                                        confirmCollector.stop()
                                        await m.edit({
                                            embeds: [initEmbed.setDescription("Initialisation en cours...")],
                                            components: []
                                        })

                                        // create line in DB

                                        // db.findOne({ UserID: member.id }, (err, data) => { 
                                        //     if (err) throw err;
                                        //     if (!data) {
                                        //         data = new db({
                                                    
                                        //             UserID: Target.id,
                                        //             UserTag: Target.user.tag,
                                                    
                                        //             PokedexName: tempDB.pokedex,            // ex: national
                                        //             PokedexRegion: String,          // ex: galar
                                        //             PokedexGameVersion: tempDB.version,     // ex: sword-shield
                                        //             PokedexGeneration: String,      // ex: gen-7
                                                    
                                        //             PokemonCaught: Array,
                                        //             PokemonNotYetCaught: Array,
                                        //         })
                                        //     }
                                        // })



                                        
                                        await m.edit({
                                            embeds: [successEmbed().setDescription("Votre pokedex a été initialisé avec succès.")],
                                            components: []
                                        })
                                    } else {
                                        await menu.deferUpdate()
                                        confirmCollector.stop()
                                        await m.edit({
                                            embeds: [new MessageEmbed().setDescription("Votre pokedex n'a pas été initialisé.").setColor("RED")],
                                            components: []
                                        })
                                    }
                                }
                            })

                            confirmCollector.on("end", async (collected, reason) => { 
                                if (reason === "time") {
                                    return m.edit({ embeds: [errorEmbed().setDescription("You didn't choose a version in time.")], components: [], ephemeral: true })
                                }
                            })
                        }


                    })

                    pokedexCollector.on("end", async (collected, reason) => {
                        if (reason === "time") {
                            return m.edit({ embeds: [errorEmbed().setDescription("You didn't choose a version in time.")], components: [], ephemeral: true })
                        }
                    })


                }
            })
            versionCollector.on("end", async (collected, reason) => { 
                
            }) 

            
        }

    }
}