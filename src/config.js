const db = require('./Models/channels')




module.exports = (guild) => {
  
  let bienvenue, auRevoir, log, report;
  
  db.findOne({
    GuildID: guild
  },
    (err, data) => {
      if (err) console.log(err)
      if (data) {
        bienvenue = LogChannelID
        auRevoir = ReportChannelID
        log = WelcomeChannelID
        report = ByeChannelID
      }
      else {
        bienvenue = null
        auRevoir = null
        log = null
        report = null
      }
    }
  )

    
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

