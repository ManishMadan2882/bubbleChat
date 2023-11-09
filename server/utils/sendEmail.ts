import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

async function sendMail(recepient: string) {

    const mailOptions = {
        from: process.env.EMAIL,
        to: recepient,
        subject: "This is a NodeMailer response",
        html: get_html_msg()
    }

    transporter.sendMail(mailOptions, (err: Error | undefined, info) => {
        if (err)
            console.log('Error: ', err);
        else
            console.log('Success: ', info);
    })
}


function get_html_msg() {
    return `
    <h3>This is a auto generated response</h3>
    <br>
    <p>
     Hi,
     This is a testing mail.
     Thanks.
    </p>
    `
}

export default sendMail