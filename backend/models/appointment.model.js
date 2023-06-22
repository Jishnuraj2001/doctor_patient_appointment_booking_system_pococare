const mongoose=require("mongoose");
const{ObjectId}=require("bson");

const appointmentSchema=mongoose.Schema({
    doctor_id:{type:ObjectId,ref:"user",required:true},
    patient_id:{type:ObjectId,ref:"user",required:true},
    date:{type:String,required:true},
    time_slot:{type:String,required:true}
});


const Appointmentmodel=mongoose.model("appointment",appointmentSchema);

module.exports={
    Appointmentmodel
}