const mongoose = require("mongoose");
require("../db/db");
const dataSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Episodes: {
        type: String,
        required: true
    },
    Rank: {
        type: String,
        required: true
    },
    ImageLink: {
        type: String,
        required: true
    },
    VideoLink: {
        type: String,
        required: true
    }
}, { versionKey: false })

const movieSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    Language: {
        type: String,
    },
    ReleaseDate: {
        type: String,
    },
    Rating: {
        type: Number,
    },
    Poster: {
        type: String,
    },
    Backdrop: {
        type: String,
    },
    Overview: {
        type: String,
    }
}, { versionKey: false })
const apiDocument = new mongoose.model("apidata", dataSchema);
const movieDocument = new mongoose.model("movieData", movieSchema);
module.exports = apiDocument;
module.exports = movieDocument;