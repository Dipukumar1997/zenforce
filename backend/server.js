// // console.log("first")
// import express from "express"
// import cors from "cors"
// import 'dotenv/config'
// import cookieParser from "cookie-parser"
// import conectDB from "./config/mongodb.js"
// const app = express();
// const port = process.env.PORT || 4000

// conectDB();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({credentials:true}));


// app.get('/',(req,res)=>res.send("API working fine "));

// app.listen(port ,()=>console.log(`server started on PORT : ${port}`));
import express from "express";
import connectDB from "../backend/config/mongodb.js";  // Ensure path is correct
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./Routes/authroutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoutes.js";

dotenv.config();

// Debugging SMTP credentials
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Exists" : "Missing");

const app = express();
const PORT = process.env.PORT || 5000;  // Use Vercel's PORT
connectDB();

// CORS Configuration
const allowedOrigins = ["http://localhost:3002"];
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("API working");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

















// const fixFieldName = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const result = await User.updateMany(
//       { isAccountverfied: { $exists: true } }, 
//       { $rename: { "isAccountverfied": "isAccountverified" } }
//     );

//     console.log(`Modified ${result.modifiedCount} documents.`);
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };





// import dotenv from "dotenv";
// dotenv.config(); // ✅ Load environment variables

// console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging

// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         if (!process.env.MONGO_URI) {
//             throw new Error("MONGO_URI is not defined in .env file");
//         }
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB Connected ✅");
//     } catch (error) {
//         console.error("MongoDB Connection Error ❌:", error);
//         process.exit(1);
//     }
// };

// connectDB();
