const express = require("express");

const app = express();

const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const staticRoute = require('./routes/staticRoute')

app.set('view engine',"ejs");//embedded javascript templating

app.set("views", path.resolve("./views"))                 


const URL = require("./models/url");

const { connectMongoDb } = require("./connect");

connectMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(() =>console.log("MongoDb Connected "));

const urlRoute = require("./routes/url");

app.use("/url", urlRoute);

app.use('/',staticRoute);

app.get('/test',async(req,res)=>{
    const URLS= await URL.find({});
    return res.render("home",{
        urls:URLS,
    });
});

app.listen(3000);
