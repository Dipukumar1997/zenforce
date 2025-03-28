import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    let token;

    // ✅ Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];  // Extract Bearer token
    } else if (req.cookies.token) {
      token = req.cookies.token;         // Fallback to cookie token
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken?.id) {
      return res.status(401).json({ success: false, message: "Invalid token, login again" });
    }

    // ✅ Attach decoded user info to request body
    req.body.userId = decodedToken.id;
    req.body.email = decodedToken.email;

    next();
  } catch (error) {
    console.error("Error in userAuth middleware:", error);
    res.status(401).json({ success: false, message: "Unauthorized or Invalid token" });
  }
};

export default userAuth;
