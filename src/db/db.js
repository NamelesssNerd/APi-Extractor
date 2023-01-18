const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/apiData").then(() => {
    console.log("Database connection sucessfully");
}).catch((error) => {
    console.log(error);
})