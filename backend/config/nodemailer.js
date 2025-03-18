import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // ✅ Ensure .env is loaded

console.log("SMTP_USER:", process.env.SMTP_USER); // Debugging
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Exists" : "Missing"); // Debugging

const transporter = nodemailer.createTransport({
    // host: "smtp-relay.brevo.com",
   host: "smtp.gmail.com",
    // port: 587,
    port:465,
    auth: {
        // user: process.env.SMTP_USER,
        user :process.env.SENDER_EMAIL,
        // pass: process.env.SMTP_PASS
        pass: process.env.SMTP_GOOGLE_PASS
    },
    secure: true
});

export default transporter;
