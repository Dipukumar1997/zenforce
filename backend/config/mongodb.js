// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
// const connectDB = async () => {
//     // try {
//     //     await mongoose.connect(process.env.MONGODB_URI, {
//     //         // dbName: "Login_registerr", // Use dbName instead of adding it manually
//     //         useNewUrlParser: true,
//     //         useUnifiedTopology: true,
//     //     });

//     //     console.log("Database connected successfully ✅");
//     // } catch (error) {
//     //     console.error("Database connection failed ❌", error);
//     //     process.exit(1); // Exit process if connection fails
//     // }
//     mongoose.connection.on('connected',()=>console.log("Database connected "));
//     await mongoose.connect(`${process.env.MONGO_URI}`);
// };

// export default connectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI
            // dbName: "Login_registerr", // Use dbName instead of adding it manually
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        );

        console.log("Database connected successfully ✅");

        // Listen for connection events
        mongoose.connection.on("connected", () => console.log("Database connected"));
    } catch (error) {
        console.error("Database connection failed ❌", error);
        // process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
