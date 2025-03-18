import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getuserdata } from "../controller/userController.js";

const uerRouter = express.Router();

uerRouter.get("/data",userAuth, getuserdata)

export default  uerRouter;