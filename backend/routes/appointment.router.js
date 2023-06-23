const express = require("express");
const appointmentRouter = express.Router();

const { Appointmentmodel } = require("../models/appointment.model");
const { authenticator } = require("../middlewares/authenticator.middleware");
const { authorizer } = require("../middlewares/authorizer.middleware");


appointmentRouter.post("/appointment", authenticator, authorizer(["patient"]), async (req, res) => {
    const { doctor_id, date, time_slot, userID } = req.body;
    try {
        const exist = await Appointmentmodel.findOne({ doctor_id, date, time_slot })||await Appointmentmodel.findOne({patient_id:userID,date,time_slot});
        console.log(exist);
        if (exist) {
            res.status(409).json({ "msg": `Slot already Booked for date:${date} and time:${time_slot},\n Please choose any other slot` });
        } else {
            const appointment = new Appointmentmodel({ doctor_id, date, time_slot, patient_id: userID });
            await appointment.save();
            res.status(202).json({ "msg": "appointment created successfully" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "msg": "something went wrong while creating new appointment" });
    }
})



appointmentRouter.get("/appointments", authenticator, authorizer(["patient", "doctor"]), async (req, res) => {
    const { userID, userRole } = req.body;
    try {
        if (userRole == "doctor") {
            const appointments = await Appointmentmodel.find({ doctor_id: userID }).populate("doctor_id patient_id");
            res.status(200).json({ "msg": "appointments fetched successfully", "data": appointments, userRole });
        } else if (userRole == "patient") {
            const appointments = await Appointmentmodel.find({ patient_id: userID }).populate("doctor_id patient_id");
            res.status(200).json({ "msg": "appointments fetched successfully", "data": appointments, userRole });
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "msg": "something went wrong while creating getting appointments" });
    }
})


appointmentRouter.delete("/appointment/:id", authenticator, authorizer(["patient"]), async (req, res) => {
    const id = req.params.id;
    try {
        const deleted_appointment = await Appointmentmodel.findByIdAndDelete(id);
        res.status(200).json({ "msg": 'Appointment canceled successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "msg": "something went wrong while canceling appointment" });
    }
})



module.exports = {
    appointmentRouter
}