import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function testEmail() {
    try {
        await transporter.verify();
        console.log("✅ SMTP Connection Successful!");
    } catch (error) {
        console.error("❌ SMTP Connection Failed:", error);
    }
}

testEmail();
