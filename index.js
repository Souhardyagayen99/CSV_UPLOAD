const express=require('express');
const app=express();
require('./config/dbConnection');
const port=process.env.PORT || 5005;


//view engine setup
app.set('view engine','ejs');
app.set('views','./views');

//Telling express that we are using this static file
app.use(express.static('./assets'));


//Main routes
app.use('/',require('./routers'));

//Universal routes
app.get('*',(req,res)=>{
    return res.send('page not found');
})


app.listen(port,(err)=>{
    if(err){
        console.log("Error to listen at port no:",port,err);
    }
    else{
        console.log("Server is running at port no:",port);
    }
})