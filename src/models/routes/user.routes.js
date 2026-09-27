import router from "express";
import {registerUser ,refreshaccessToken }from "../../controllers/user.controller.js";
import { upload } from "../../middlewares/multer.models.js";
import verifyJWT from "../../middlewares/auth.middleware.js";
const userRouter = router();
userRouter.route("/register").post(upload.fields([
        { name: "avatar", maxCount: 1 },
        {   name: "cover", maxCount: 1 }
    ]), registerUser);



userRouter.route("/login").post(verifyJWT, loginUser);

// secure routes 
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshaccessToken)
export default userRouter;