//Import mongoose package
const mongoose = require('mongoose');

//Database connection code

const mongoAtlasUri = 'mongodb+srv://souhardyagayen99:I5MNSsLAifJJVhWP@cluster0.tjwzsru.mongodb.net/';


var db = mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },

).then((result) => {
    console.log("Database connected successfully")
})
    .catch((err) => {
        console.log("Error to connect database", err);
    })




module.exports = db;