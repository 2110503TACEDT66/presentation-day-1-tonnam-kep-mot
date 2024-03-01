const express = require('express');
const dotenv = require('dotenv');
const campgrounds = require ('./routes/campgrounds');
dotenv.config({path:'./config/config.env'});
const app = express();
app.use('/api/v1/campgrounds',campgrounds);
const PORT=process.env.PORT || 7777;
app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV,' Mode on port ',PORT));