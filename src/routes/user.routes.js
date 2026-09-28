import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshaccessToken,
    updateAccountDetails,
    changeCurrentPassword,
    getCurrentUser,
    updateuserAvatar,
    updateuserCoverimage,
    getuserchannelProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.models.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 }
]), registerUser);

userRouter.route("/login").post(loginUser);

// secure routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshaccessToken);
userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);
userRouter.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateuserAvatar);
userRouter.route("/cover-image").patch(verifyJWT, upload.single("cover"), updateuserCoverimage);
userRouter.route("/c/:userName").get(verifyJWT, getuserchannelProfile);
userRouter.route("/history").get(verifyJWT, getWatchHistory);

export default userRouter;
