import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Limit } from "./constants";


const app = express()



app.use(cors({
    origin: process.env.Cores_Origin,
    credentials: true
}));
 app.use(express.json({ limit: Limit }))
 app.use(express.urlencoded({ limit: Limit, extended: true }))
 app.use(express.static("public"))
 app.use(cookieParser());

 



export { app };