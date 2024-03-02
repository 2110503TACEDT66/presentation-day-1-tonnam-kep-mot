const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');
const connectDB = require('./config/db')
const campgrounds = require ('./routes/campgrounds');
const auth = require('./routes/auth');
dotenv.config({path:'./config/config.env'});
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/campgrounds',campgrounds);
app.use('/api/v1/auth',auth);
const PORT=process.env.PORT || 7777;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV,' Mode on port ',PORT));
process.on('unhandleRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
});