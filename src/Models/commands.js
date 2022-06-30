const { Schema, model } = require('mongoose');

module.exports = model('Commands', new Schema({
    GuildID: String,
    GuildName: String,
    CommandData: Array,
}));