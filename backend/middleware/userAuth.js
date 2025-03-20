import jwt from "jsonwebtoken";
const userAuth = async (req,res,next)=>{
    const token= req.cookies.token;
    if (!token) {
        return res.json({sucess:false, message: 'not authrozied login again'})
    }
    try {
       const decodedtoken= jwt.verify(token,process.env.JWT_SECRET);
       const userId = decodedtoken?.id;
       if (!userId) {
        return res.status(401).json({ success: false, message: "Invalid token, please log in again" });
    }
       if (decodedtoken.id) {
        // console.log("decoded token ",decodedtoken.id)
       

        req.body.userId = decodedtoken.id;
        req.body.email = decodedtoken.email;
        // console.log("req.body.userId ",req.body.userId )
        // console.log("req.body.useremail ",req.body.email )
       }else{
        return res.json({sucess:false, message:"Not Authoried Login Aagin"})
       }
    //    req.body.email = user.email; // ✅ Now logout can access `req.body.email`
       next();
    } catch (error) {
        res.json({sucess:false, message:"error.message"})
    }
}
export default userAuth;