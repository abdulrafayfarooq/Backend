import connectDB from "./db/db.js";
import dotenv from "dotenv";
import DB_name from "./contrast.js";    

dotenv.config({
    path: "./.env"
});


connectDB();