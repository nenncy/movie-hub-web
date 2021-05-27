const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv=require('dotenv');

require('dotenv').config();
const app=express();
const port=process.env.PORT || 5000;

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());


dotenv.config({path:'./config.env'});

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb://localhost:27017/mern', { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/auth', require('./routes/user'));
app.use('/favorite', require('./routes/favorite'));

//heroku 
if ( process.env.NODE_ENV == "production"){

  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*",(req,res)=>{
    res.sendFile(path_resolve(__dirname,'client','build','index.html'));
  })
}




//


app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
 });