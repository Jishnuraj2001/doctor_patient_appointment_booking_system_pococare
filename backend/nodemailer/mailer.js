require("dotenv").config();
const nodemailer=require("nodemailer");

async function sendMailFn(user_email,subject,text){
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jishnurajkarockal2001@gmail.com',
                pass: process.env.email_password
            }
        });


        const mailOptions = {
            from: 'jishnurajkarockal2001@gmail.com',
            to: `${user_email}`,
            subject:`${subject}`,
            text: `${text}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // return res.status(500).json({ "msg": 'Error while sending conformation mail' });
                console.log(error.message);
            } else {
                console.log("mail sended successfully");
                // return res.status(200).json({ "msg": "new booking created successfully Confiramtion sent to email" });
            }
        });


    } catch (error) {
        console.log(error.message);
    }

}



module.exports={
    sendMailFn
}