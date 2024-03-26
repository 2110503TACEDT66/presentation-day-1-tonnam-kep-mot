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
    picture: {
        type: String
    }
},{
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
});

//revere populate with virtual
Campgroundschema.virtual('bookings',{
    ref:'Booking',
    localField: '_id',
    foreignField:'campground',
    justOne:false
});
//cascade delete appt
Campgroundschema.pre('deleteOne',{document: true,query: false},async function(next){
    console.log(`Booking being removed from campground ${this._id}`);
    await this.model('Booking').deleteMany({campground:this._id});
    next();
});

module.exports = mongoose.model('Campground', Campgroundschema);
