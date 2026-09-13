import connectDB from "./db/db.js";
import dotenv from "dotenv";
import DB_name from "./constants.js";    

dotenv.config({
    path: "./.env"
});


connectDB()
.then(app.listen(process.env.Port, () => {
    console.log(`Server is running on port ${process.env.Port}`);
    console.log(`Database name: ${DB_name}`);
})
.catch((err) => {
    console.log("Mongodb connection failed !!! ", err);
}));
