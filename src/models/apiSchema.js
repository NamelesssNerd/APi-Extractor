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
const apiDocument = new mongoose.model("apidata", dataSchema);
module.exports = apiDocument;