import 'dotenv/config'
import { createTransport } from "nodemailer";
import { EmailRequest } from "../interfaces/emailReq.interface";
import { AppError } from '../errors/AppError.errors';

export const emailService = async({subject, text, to}: EmailRequest) => {
  console.log(process.env.SMTP_USER)
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    html: text
  })
  .then(() => {
    console.log('Email send with success')
  })
  .catch((err) => {
    console.log(err)
    throw new AppError('Error sending mail')
  })
}