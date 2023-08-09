
const nodemailer = require("nodemailer");


const mailSender = async (email, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: 'The Voice',
                to:`${email}`,
                subject: `verification code`,
                html: `${body}`,
            })
            // console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;