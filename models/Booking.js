const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    bookingDate: {
        type:Date,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    campground:{
        type:mongoose.Schema.ObjectId,
        ref:'Campground',
        required:true
    },
    createdBooking:{
        type:Date,
        default:Date.now
    },
});
module.exports=mongoose.model('Booking',BookingSchema);