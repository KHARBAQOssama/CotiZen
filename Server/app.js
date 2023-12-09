const express = require('express');
const cookieParser = require('cookie-parser');

const userRoutes = require('./api/components/users/routes')
const app = express()
require('dotenv').config();
require('./config/database')();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRoutes)
app.get('/',(req,res)=>{
    return res.status(200).json({message : "Welcome Back"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log("running");})


