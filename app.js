/*
--> By: Sushant khadka
------ NodeJS Bakend to save the apis Data into the MongoDB DataBase and create the api.json file that can be used as the static api
*/
const express = require("express");
const path = require("path")
const CircularJSON = require("circular-json")
const axios = require("axios");
const cors = require("cors")
const fs = require("fs");
require("./src/db/db");
const apiDocument = require("./src/models/apiSchema");
const port = process.env.PORT || 8000;
const app = express();
const outputPath = path.join(__dirname, "src/assets/output/myApi.json")
app.use(cors());
app.get("/", async (req, res) => {
    try {
        const noValue = [4, 5, 7, 8, 9, 10, 12, 13, 19]
        const nullYear = 1973;
        const nullEpisods = 12;
        let Data = await axios.get("https://api.jikan.moe/v4/anime?=918");
        const str = CircularJSON.stringify(Data);
        const newData = JSON.parse(str)
        const { data } = newData.data;
        data.map((currenelem, index) => {
            if (!noValue.includes(index)) {
                let { title, year, episodes, rank, } = currenelem;
                const imageLink = currenelem.images["jpg"].large_image_url;
                const videoLink = currenelem.trailer['embed_url'];
                if (year == null) {
                    year = nullYear;
                }
                if (episodes == null) {
                    episodes = nullEpisods;
                }
                const saveData = new apiDocument({
                    Title: title,
                    Year: year,
                    Episodes: episodes,
                    Rank: rank,
                    ImageLink: imageLink,
                    VideoLink: videoLink
                })
                const result = saveData.save();
            }
        })
        const result = await apiDocument.find({})
        const csvData = JSON.stringify(result)
        fs.writeFileSync(outputPath, csvData)
        res.send(result);
    } catch (error) {
        console.log(error)
    }
})
app.listen(port, () => console.log(`Server is running at port : ${port}`))