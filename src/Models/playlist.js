const { Schema, model } = require("mongoose");

module.exports = model(
    "Playlist",
    new Schema({
        UserID: String,
        PlaylistID: String,
        SongName: String,
        SongUrl: String,
    })
);
