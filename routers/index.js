//Import express module
const express=require('express');
console.log('express module:',typeof(express));
//Extract rotue functionality from express
const router=express.Router();
console.log('router:',router);
//Import index.js controller file
const index=require('../controllers/index.js');
//Import multer module
const multer = require("multer");
// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });
//Home page route
router.get('/',index.home);
//File upload route
router.post('/upload-file',upload.single('file') ,index.fileUpload);
//File delete route
router.get('/delete/:destination',index.delete);
//Route to show the file in table format
router.get('/open-file/:id',index.openFile);


module.exports=router;