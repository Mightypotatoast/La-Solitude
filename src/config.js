const db = require('./Models/channels')




module.exports = (guildID) => {
  
  //fetch channel from database and store in global variable
  let bienvenue, auRevoir, log, report
  
  let oui = async() => {
    await db.findOne({ GuildID: guildID }, (err, data) => {
    
      if (err) console.log(err)

      if (data) {

        bienvenue = data.WelcomeChannelID
        auRevoir = data.ByeChannelID
        log = data.LogChannelID
        report = data.ReportChannelID
      }

    })
  }


  console.log(bienvenue, auRevoir, log, report);
    
  return {
      channel: {
        bienvenueID: bienvenue,

        au_revoirID:  auRevoir,

        logID: log,

        reportID: report
      },

      MainGuilds: [
        
        {
          name: "Sensokami",
          id: "235816886259023872"
        },

        {
          name: "L'Empereur Patate",
          id: "493383989588000769"
        },

        {
          name: "Test Server",
          id: "813377350385008721"
        }

      ]
    }
    
}

