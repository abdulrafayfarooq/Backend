import router from "express";
import { registerUser,
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
}from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.models.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = router();
userRouter.route("/register").post(upload.fields([
        { name: "avatar", maxCount: 1 },
        {   name: "cover", maxCount: 1 }
    ]), registerUser);
userRouter.route("/login").post(verifyJWT, loginUser)
// secure routes 
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/refresh-token").post(refreshaccessToken)
userRouter._router("/updateAccountDetails").post(verifyJWT,updateAccountDetails)
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword)
userRouter.route("/current-user").get(getCurrentUser)
userRouter.route("/avatar").avatar(verifyJWT, updateuserAvatar)
userRouter.route("/cover-image").put(verifyJWT, updateuserCoverimage)
userRouter.route("/c/:username").get(verifyJWT, getuserchannelProfile)
userRouter.route("/history").get(verifyJWT, getWatchHistory)
userRouter.route("/updateuserAvatar").patch(verifyJWT, updateuserAvatar)
userRouter.route("/updateuserCoverimage").patch(verifyJWT, updateuserCoverimage)
userRouter.route("/getuserchannelProfile").get(verifyJWT, getuserchannelProfile)
userRouter.route("/getWatchHistory").get(verifyJWT, getWatchHistory)

export default userRouter;