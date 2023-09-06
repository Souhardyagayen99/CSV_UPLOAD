//Import mongoose package
const mongoose = require('mongoose');

//Database connection code

const mongoAtlasUri = 'mongodb+srv://salajmondal27032001:mondalcse18@cluster0.uaeulnt.mongodb.net/file_upload?retryWrites=true&w=majority';


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