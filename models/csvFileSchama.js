//Import mongoose module
const mongoose=require('mongoose');
//Creating file schama
const fileSchama=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    originalname:{
        type:String,
        required:true
    }
},{
    timeStamp:true
})


//Creating model
const csvFile=mongoose.model('csvFile',fileSchama);

module.exports=csvFile;