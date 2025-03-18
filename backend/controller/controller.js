import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import trensporter from "../config/nodemailer.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE , PASSWORD_RESET_TEMPLATE } from "../config/emailTemplate.js";
// impory {EMAIL_VERIFY_TEMPLATE}

export const register = async (req, res) => { // ✅ Fixed: Uncommented and properly wrapped function
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "missing details " });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "user already exist with this email " });
        }
        const hashesPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashesPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ Fixed: Corrected maxAge calculation for 7 days
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "welcome to login and sigup welcome ",
            text: `welcome to our websoite running on the text port by the way your email id is ${email} id `
        }
        await trensporter.sendMail(mailOptions);
        return res.json({ success: true, message: "user created succesfully " });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "email and password are required  " });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "invalid email " });
        }
        const ismatched = await bcrypt.compare(password, user.password);

        if (!ismatched) {
            return res.json({ success: false, message: "invalid password  " });
        }

        const token = jwt.sign({ id: user._id, email: user.email  }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ Fixed: Corrected maxAge calculation for 7 days
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Login on our website ",
            text: `woww you come back .. come back  .. we are happy now  😊😊😊😊😊  `
        }
        await trensporter.sendMail(mailOptions);
        // return res.json({ success: true, message: "user created succesfully " });

        // return res.json({ success: true, message: "logout successfully " }); // ✅ Fixed: Changed `success: false` to `success: true


        return res.json({ success: true , message: "Login Successfull" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    const email = req.body.email; 
    try {
        res.clearCookie('token', { // ✅ Fixed: Removed undefined `token`
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ Fixed: Corrected maxAge calculation for 7 days
        });
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Logout from our website ",
            text: `we will miss you .. come back  .. we are crying 😭 😭 😭 😭  `
        }
        await trensporter.sendMail(mailOptions);
        // return res.json({ success: true, message: "user created succesfully " });

        return res.json({ success: true, message: "logout successfully " }); // ✅ Fixed: Changed `success: false` to `success: true`

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const sendverfifyOtp = async (req, res) => {
    try {
        // const user = await userModel.findOne({ email });
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        const user1 = await userModel.findOne({ email });

        if (user.isAccountverfied) {
            return res.json({ success: false, message: "Account already verfiled " });
        }

        const otp = String(Math.floor(100000+Math.random()*900000));
        user.verfiyOtp =otp;
        user.verfiyOtpExpireAt = Date.now()+24*60*60*1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verfication OTP",
            // text: `Your OTP for verifation is ${otp} `,
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp)
        }
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "OTP send succesfufully " })
    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

export const verifyEmail = async (req,res)=>{
    const {userId, otp}= req.body;
    if (!userId|| !otp) {
        return res.json({success:false , message:'Missing Details'})
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({success:false , message:'user not found '})
        }
        if (user.verfiyOtp===''|| user.verfiyOtp!=otp) {
            return res.json({success:false , message:'Invalid otp please enter correct otp'}) 
        }
        if (user.verfiyOtpExpireAt<Date.now()) {
            return res.json({success:false , message:'OTP expired '}) 
        }
        user.isAccountverified=true;
        user.verfiyOtp ='';
        user.verfiyOtpExpireAt =0;

        await user.save();
        return res.json({success:true , message:'email verfied sucessfully  '}) 
    } catch (error) {

        return res.json({success:false , message:error.message})
    }

}

export const isAuthenticated = async (req , res)=>{
    try {
        return res.json({success:true})
    } catch (error) {
        return res.json({success:false , message:error.message})
    }
}
//send password ressting
// export const sendResetOtp = async (req,res)=>{
//     const {email} = req.body;
//     if(!email){
//         return res.json({success:false , message:"email is required"})
//     }
//     try {
//         const user = await userModel.findOne({email});
//         if (!user) {
//             return res.json({success:false , message:"user not found "})
//         }
//         const otp = String(Math.floor(100000+Math.random()*900000));
//         user.resetOtp =otp;
//         user.resetOtpExpireAt = Date.now()+15*60*1000;

//         await user.save();

//         const mailOptions = {
//             from: process.env.SENDER_EMAIL,
//             to: user.email,
//             subject: "Password reset otp",
//             // text: `Your OTP for restting your password  is ${otp} and this will expire in  next 15 minutes   `,
//             html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}".user.email).replace("{{Name}}", user.name)
//         }
//         await transporter.sendMail(mailOptions);
//         return res.json({success:true , message:"otp send to your email "})
//     } catch (error) {
//         return res.json({success:false , message:error.message})
//     }
// }
export const sendResetOtp = async (req, res) => {
    // const name = user.name;
    // const name = 
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User  not found" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password reset OTP",
            html: PASSWORD_RESET_TEMPLATE
                .replace("{{otp}}", otp)
                .replace("{{email}}", user.email) // Corrected this line
                .replace("{{Name}}", user.name) //temporliy 
        };
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
export const resetPassword = async (req,res)=>{
    const {email , otp , newPassword } = req.body;
    if (!email || !otp || !newPassword ) {
        return res.json({success:true , message:'emailotp and new password are required '}) 
    }
    try {
        const user  = await userModel.findOne({ email });
        if (!user ) {
            return res.json({success:false , message:"user not found "}) 
        }
        if (user.resetOtp ===""|| user.resetOtp != otp ) {
            return res.json({success:false , message:"Invaid Otp "}) 
        }
        if (user.resetOtpExpireAt<Date.now()) {
            return res.json({success:false , message:"Otp expired "}) 
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({success:true , message:"Password has been saved sucessfully"}) 

    } catch (error) {
        return res.json({success:false , message:error.message}) 
    }
}