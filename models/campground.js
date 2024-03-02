///models/Campground.js
const mongoose = require('mongoose');
const Campgroundschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String
    },
},{
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
});

//revere populate with virtual
Campgroundschema.virtual('appointments',{
    ref:'Appointment',
    localField: '_id',
    foreignField:'campground',
    justOne:false
});


module.exports = mongoose.model('Campground', Campgroundschema);
