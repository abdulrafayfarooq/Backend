import requestHandler from "../utils/requstHandler.js";



const registerUser = requestHandler(async (req, res) => {
    res.status(200).json({
        message: "User registered successfully",
        
    });
});


export default registerUser;