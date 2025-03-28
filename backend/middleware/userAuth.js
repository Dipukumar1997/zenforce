import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const token = req.cookies?.token;  // Use optional chaining to avoid crashes
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decodedToken?.id) {
            return res.status(401).json({ success: false, message: "Invalid token, login again" });
        }

        req.body.userId = decodedToken.id;
        req.body.email = decodedToken.email;

        next();
    } catch (error) {
        console.log("error in userauth");
        res.status(500).json({ success: false, message: error.message });
    }
};

export default userAuth;
