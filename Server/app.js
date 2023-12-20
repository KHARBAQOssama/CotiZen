const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use('/', userRoutes)
app.use('/apartment', apartmentRoutes)
app.use('/payment', paymentsRoutes)
app.use('/invoice', invoicesRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log("running on "+PORT);})


