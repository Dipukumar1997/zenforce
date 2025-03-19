// import jwt from "jsonwebtoken";
// const userAuth = async (req,res,next)=>{
//     const {token} = req.cookies;
//     if (!token) {
//         return res.json({sucess:false, message: 'not authrozied login again'})
//     }
//     try {
//        const decodedtoken= jwt.verify(token,process.env.JWT_SECRET);
//        const userId = decodedtoken?.id;
//        if (!userId) {
//         return res.status(401).json({ success: false, message: "Invalid token, please log in again" });
//     }
//        if (decodedtoken.id) {
//         req.body.userId = decodedtoken.id;
//         req.body.email = decodedtoken.email;
//        }else{
//         return res.json({sucess:false, message:"Not Authoried Login Aagin"})
//        }
//     //    req.body.email = user.email; // ✅ Now logout can access `req.body.email`
//        next();
//     } catch (error) {
//         res.json({sucess:false, message:error.message})
//     }
// }
// export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  // ✅ Support both cookie & header token


    if (!token) {
        // const token = "jjjjj"+req.cookies.token ;
        return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken?.id) {
            return res.status(401).json({ success: false, message: "Invalid token, login again" });
        }

        req.body.userId = decodedToken.id;
        req.body.email = decodedToken.email;

        // ✅ Pass control to the next middleware
        next();  

    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default userAuth;
