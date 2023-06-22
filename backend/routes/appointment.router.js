const express = require("express");
const appointmentRouter = express.Router();

const { Appointmentmodel } = require("../models/appointment.model");
const { authenticator } = require("../middlewares/authenticator.middleware");
const { authorizer } = require("../middlewares/authorizer.middleware");


appointmentRouter.post("/appointment",authenticator,authorizer(["patient"]),async (req, res) => {
    const{doctor_id,date,time_slot,userID}=req.body;
    try {
        console.log(req.body);
        res.status(202).json({"msg":"appointment created successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "msg": "something went wrong while creating new appointment" })
    }
})



module.exports = {
    appointmentRouter
}