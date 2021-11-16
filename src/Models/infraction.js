const { Schema, model } = require('mongoose');

module.exports = model('Infractions', new Schema({

    GuildID: String,
    GuildName: String,
    UserID: String,
    UserTag: String,
    WarnData: Array,
    BanData: Array,
    KickData: Array,
    MuteData: Array
        
}));