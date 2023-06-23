const express = require("express");
const appointmentRouter = express.Router();

const { Appointmentmodel } = require("../models/appointment.model");
const { Usermodel } = require("../models/user.model");
const { authenticator } = require("../middlewares/authenticator.middleware");
const { authorizer } = require("../middlewares/authorizer.middleware");
const { sendMailFn } = require("../nodemailer/mailer");


appointmentRouter.post("/appointment", authenticator, authorizer(["patient"]), async (req, res) => {
    const { doctor_id, date, time_slot, userID } = req.body;
    try {
        const exist = await Appointmentmodel.findOne({ doctor_id, date, time_slot }) || await Appointmentmodel.findOne({ patient_id: userID, date, time_slot });
        console.log(exist);
        if (exist) {
            res.status(409).json({ "msg": `Slot already Booked for date:${date} and time:${time_slot},\n Please choose any other slot` });
        } else {
            const user = await Usermodel.findOne({ _id: userID });
            const user_email = user.email;
            const subject = "Appointment Confirmation";
            const text = `Dear ${user.name},\n\nThank you for booking your appointment. We are pleased to confirm your appointment on ${date} at ${time_slot}.\n\nPlease join 10 minutes before your scheduled time and bring any necessary documents or medical records.\n\nIf you have any questions, please contact us at your earliest convenience.\n\nWe look forward to seeing you.\n\nBest regards,\nThe Appointment Team`;            
            sendMailFn(user_email,subject,text);
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
    const{userID}=req.body;
    try {
        const user = await Usermodel.findOne({ _id: userID });
        const appointment=await Appointmentmodel.findOne({_id:id});
        const user_email = user.email;
        const subject = "Appointment Cancellation";
        const text = `Dear ${user.name},\n\nWe would like to inform you that your appointment on ${appointment.date} at ${appointment.time_slot} has been successfully cancelled as per your request.\n\nIf you have any questions or need further assistance, please don't hesitate to reach out to us.\n\nWe apologize for any inconvenience caused.\n\nBest regards,\nThe Appointment Team`;
        
        sendMailFn(user_email,subject,text);
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