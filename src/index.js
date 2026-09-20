import connectDB from "./db/db.js";
import dotenv from "dotenv";
import {DB_name }from "./constants.js";    
import { app } from "./app.js";
dotenv.config({
    path: "./.env"
});


connectDB()
.then(() => {
    app.listen(process.env.Port, () => {
        console.log(`Server is running on port ${process.env.Port}`);
    });
})
.catch((err) => {
    console.log("Mongodb connection failed !!! ", err);
});

