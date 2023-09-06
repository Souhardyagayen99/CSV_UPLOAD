//Import path module
const path = require("path");
//Import file system module
const fs = require('fs');
//Import csvtojson module
const csv = require('csvtojson');
//Import request module
const request = require('request');
//import firebase/app 
const initializeApp = require("firebase/app");
//Import csvfile model
const csvFile = require('../models/csvFileSchama');
console.log(initializeApp);
//Import firebase/storage
const st = require("firebase/storage");
//Import firebase config
const config = require('../config/firebaseconfig');

//Initialize a firebase application
initializeApp.initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = st.getStorage();

//This function 
module.exports.home = function (req, res) {
    csvFile.find({}).then((result) => {
        return res.render('home', {
            result: result

        });

    }).catch((err) => {
        console.log("Error to find file", err);
        return;
    })

}

//This function help to upload a file
module.exports.fileUpload = async function (req, res) {
    console.log(req.file);

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = st.ref(storage, `files/${req.file.originalname + "" + dateTime + '.csv'}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await st.uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await st.getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        console.log(req.file);

        if (req.file.mimetype === 'text/csv') {
            console.log("This is csv file");
        }
        var csvfile = new csvFile({
            name: req.file.originalname + "" + dateTime + '.csv',
            destination: downloadURL,
            originalname:req.file.originalname 
        })
        csvfile.save().then((ans) => {
            console.log(ans);
           
            return res.redirect('/');

        }).catch((err) => {
            console.log("Error to save data in database", err);
            return res.send("Error to save data in data base");

        })


    } catch (error) {
        return res.status(400).send(error.message)
    }
    
}

//This function return current date and time in string format
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

//This function delete files
module.exports.delete = function (req, res) {
    csvFile.findById(req.params.destination).then((result) => {
        console.log(result);

        // Create a reference to the file to delete
        const desertRef = st.ref(storage, 'files/'+result.name);

        // Delete the file
        st.deleteObject(desertRef).then(() => {
            // File deleted successfully
            
            csvFile.findByIdAndDelete(result.id).then((ans)=>{
                console.log("Delete complate");
                return res.redirect('/');

            })
            .catch((err)=>{
                return res.send(err);

            })
           
        }).catch((error) => {
            // Uh-oh, an error occurred!
           
        });



    }).catch((err) => {
        console.log("Error to find file", err);
        return res.send(err.message);
    })
    
}

//This function represent the csv file in table format
module.exports.openFile = function (req, res) {
    console.log(req.query);
    csvFile.findById(req.params.id).then((ans) => {
        console.log(ans);
        csv()
            .fromStream(request.get(ans.destination))
            .then((result) => {

                console.log(result);
                console.log(Object.keys(result[0]));
                let keys = Object.keys(result[0])
                
                return res.render('table', {
                    result: result,
                    keys: keys
                });
            }).catch((err) => {
                console.error(err);
                return res.send('Error to fetch data');
            })

    }).catch((err) => {
        console.log("Error to find data from db", err);
        return res.send(err);
    })



}


