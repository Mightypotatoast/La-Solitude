const db = require('./Models/channels')




module.exports = async (guildID) => {
  
  //fetch channel from database and store in global variable
  let bienvenue, auRevoir, log, report
  
  
  await db.findOne({ GuildID: guildID }, async (err, data) => {
  
    if (err) console.log(err)

    if (data) {

      bienvenue = (data.WelcomeChannelID) ? data.WelcomeChannelID : null
      auRevoir = (data.ByeChannelID) ? data.ByeChannelID : null
      log = (data.LogChannelID) ? data.LogChannelID : null
      report = (data.ReportChannelID) ? data.ReportChannelID : null

    }
      
  }).clone()

  
  


  console.log(bienvenue, auRevoir, log, report);
    
  return {
      channel: {
        bienvenueID: bienvenue,

        au_revoirID:  auRevoir,

        logID: log,

        reportID: report
      },

    }
    
}

