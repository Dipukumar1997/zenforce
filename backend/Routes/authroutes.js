import express   from "express";
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendverfifyOtp, verifyEmail } from "../controller/controller.js";
import userAuth from "../middleware/userAuth.js";
const authRouter = express.Router();

// const authRouter a

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userAuth,logout);
authRouter.post('/send-verify-otp',userAuth,sendverfifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.get('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);

export default authRouter;