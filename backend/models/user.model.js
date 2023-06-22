const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,enum:["male","female"],default:"male",required:true},
    role:{type:String,enum:["doctor","patient","admin"],default:"patient",required:true},
    location:{type:String,required:true},
    doctor_specialization:String
})

const Usermodel=mongoose.model("user",userSchema);

module.exports={
    Usermodel
}