const { Schema, model } = require('mongoose')

module.exports = model('Channels', new Schema({

    GuildID: String,
    LogChannelID: String,
    ReportChannelID: String,
    WelcomeChannelID: String,
    ByeChannelID: String,
    
}))

