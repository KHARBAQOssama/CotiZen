const express = require('express');

const app = express()
require('dotenv').config();
require('./config/database')();

app.get('/',(req,res)=>{
    return res.status(200).json({message : "Welcome Back"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log("running");})