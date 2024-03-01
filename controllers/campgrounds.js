exports.getCampgrounds=(req,res,next)=>{
    res.status(200).json({success:true, msg:'Get all Campgrounds'});
}
exports.getCampground=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Show Campgrounds ${req.params.id}`});
}
exports.createCampground=(req,res,next)=>{
    res.status(200).json({success:true, msg:'Create new Campgrounds'});
}
exports.updateCampground=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Update Campgrounds ${req.params.id}`});
}
exports.deleteCampground=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Delete Campgrounds ${req.params.id}`});
}