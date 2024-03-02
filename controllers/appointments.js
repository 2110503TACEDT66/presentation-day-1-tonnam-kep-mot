const Appointment = require('../models/Appointment');
const Campground = require('../models/Campground');

exports.getAppointments = async (req, res, next) => {

    let query;


    if (req.user.role !== 'admin') {
        query = Appointment.find({ user: reg.user.id }).populate({
            path: "campground",
            select: "name address tel"
        });

    } else { //If you are an admin, you can see all!

        if (req.params.campgroundId) {

            console.log(req.params.campgroundId);

            query = Appointment.find({ campground: req.params.campgroundId }).populate({
                path: "campground",
                select: "name address tel"
            });

        } else query = Appointment.find().populate({
            path: "campground",
            select: "name address tel"
        });
    }

    try {

        const appointments = await query;
        res.status(200).json({

            success: true,
            count: appointments.length,

            data: appointments

        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false, message:"Cannot find Appointment"
        });
    }

};
exports.getAppointment = async (req, res, next) => {
    try {
    const appointment = await Appointment.findById(req.params.id).populate({
        path: "campground",
        select: "name address tel"
    });
    if(!appointment){
        return res.status(404).json({success:false,message:`No appointment with the id of ${req.params.id}`});
    }
    res.status(200).json({
        success: true,
        data: appointment
    });
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            success: false, message:"Cannot find Appointment"
        });
    }
};
exports.addAppointment = async (req, res, next) => {
    try {
        
        req.body.campground=req.params.campgroundId;
        
        const campground = await Campground.findById(req.params.campgroundId);
        
        if(!campground){
        
        return res.status (404).json({success:false,message: `No campground with the id of ${req.params.campgroundId}` });
        }
        req.body.user=req.user.id;
        const existAppointments=await Appointment.find({user:req.user.id});
        if(existAppointments.length >= 3 && req.user.role !=='admin'){
            return res.status(400).json({success:false,message:`The user with ID ${req.user.id} has already made 3 appointments`})
        }
        const appointment = await Appointment.create

        (req.body);

        res.status(200).json({

        success:true,

        data: appointment

        });

        } catch (error) {

        console.log(error);

        return res.status(500).json({success:false,message: "Cannot create Appointment"});
        }
};
exports.updateAppointment = async (req, res, next) =>{
    try{
        let appointment = await Appointment.findById(req.params.id);
        if(!appointment){
            return res.status (404).json({success:false,message: `No campground with the id of ${req.params.id}` }); 
        }

        if(appointment.user.toString()!==req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to update this appointment`});
        }
        appointment=await Appointment.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({

            success:true,
    
            data: appointment
    
            });
    } catch (error){
        console.log(error);
        return res.status(500).json({success:false,message: "Cannot update Appointment"});
    }
};
exports.deleteAppointment = async (req, res, next) =>{
    try{
        const appointment = await Appointment.findById(req.params.id);
        if(!appointment){
            return res.status (404).json({success:false,message: `No campground with the id of ${req.params.id}` }); 
        }
        if(appointment.user.toString()!==req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this appointment`});
        }
        await appointment.deleteOne();
        res.status(200).json({

            success:true,
    
            data: {}
    
            });
    } catch (error){
        console.log(error);
        return res.status(500).json({success:false,message: "Cannot delete Appointment"});
    }
};