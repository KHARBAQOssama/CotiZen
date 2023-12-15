const express = require('express');
const cookieParser = require('cookie-parser');
const invoiceGeneration = require('./jobs/invoiceGenerationJob')
const userRoutes = require('./api/components/users/routes')
const apartmentRoutes = require('./api/components/appartements/routes')
const paymentsRoutes = require('./api/components/payments/routes')
const invoicesRoutes = require('./api/components/invoices/routes')
const app = express()
require('dotenv').config();
require('./config/database')();

invoiceGeneration;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRoutes)
app.use('/apartment', apartmentRoutes)
app.use('/payments', paymentsRoutes)
app.use('/invoices', invoicesRoutes)
app.get('/',(req,res)=>{
    return res.status(200).json({message : "Welcome Back"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log("running");})


