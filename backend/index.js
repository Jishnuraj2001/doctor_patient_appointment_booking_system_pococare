const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const { appointmentRouter } = require("./routes/appointment.router");

app.get("/", (req, res) => {
    res.send("Basic API endpoint for Buycars.com");
})

app.use("/", userRouter);
app.use("/", appointmentRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Server Connected to MongoDB");
        console.log(`Server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log("Unable to connect to DataBase");
        console.log(error.message);
    }
})