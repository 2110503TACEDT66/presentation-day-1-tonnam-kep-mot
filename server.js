const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const {xss} = require('express-xss-sanitizer');
const rateLimit =  require('express-rate-limit') ;
const hpp = require('hpp');
const cors = require('cors');

const campgrounds = require ('./routes/campgrounds');
const bookings = require('./routes/bookings');
const auth = require('./routes/auth');
const limiter=  rateLimit({
    windowMs : 10*60*1000,
    max: 100
});

dotenv.config({path:'./config/config.env'});
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
// app.use(limiter);
app.use(hpp());
app.use(cors());

app.use('/api/v1/campgrounds',campgrounds);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/auth',auth);


const PORT=process.env.PORT || 7777;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV,' Mode on port ',PORT));
process.on('unhandleRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
});