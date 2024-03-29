const sql = require("../config/campCenterDB");

//constructor
const CampCenter = function(campCenter){
    this.id = campCenter.id;
    this.name = campCenter.name;
    this.tel = campCenter.tel;
};

CampCenter.getAll = result => {
    sql.query("SELECT * FROM campCenters", (err , res) => {
        if(err){
            console.log("error: ",err);
            result(null, err);
            return;
        }
        console.log("campCenters: ", res);
        result(null, res);
    });
};

module.exports = CampCenter;