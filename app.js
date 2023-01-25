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
const movieDocument = require("./src/models/apiSchema");
const { type } = require("os");
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
app.get("/movies", async (req, res) => {
    try {
        const total = 36798; 
        for (var i = 503; i < total; i++) {
            let Data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9d6d123e53254f3a6125c78206a40157&language=en-US&page=${i}`);
            const str = CircularJSON.stringify(Data);
            const newData = JSON.parse(str)
            const hamrodata = newData.data.results
            hamrodata.map((currenelem, index) => {
                let { title, original_language, release_date, vote_average, overview } = currenelem;
                // console.log(title, "\n", original_language, "\n", release_date, "\n", vote_average, "\n",poster_path, "\n", backdrop_path, "\n", overview, "\n")
                // if (overview == "") {
                //     console.log(overview)
                //     overview = "not found"
                // }
                let poster_path = "http://image.tmdb.org/t/p/w500" + currenelem["poster_path"];
                let backdrop_path = "http://image.tmdb.org/t/p/w500" + currenelem["backdrop_path"];
                const saveData = new movieDocument({
                    Title: title,
                    Language: original_language,
                    ReleaseDate: release_date,
                    Rating: vote_average,
                    Poster: poster_path,
                    Backdrop: backdrop_path,
                    Overview: overview,
                })
                const result = saveData.save();
            })
            console.log(i)
        }
        // const result = await movieDocument.find({})
        // const csvData = JSON.stringify(result)
        // fs.writeFileSync(outputPath, csvData)
        res.send("ok");
    } catch (error) {
        console.log(error)
    }
})
app.listen(port, () => console.log(`Server is running at port : ${port}`))