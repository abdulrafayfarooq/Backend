import requestHandler from "../utils/requstHandler.js";
import apiError from "../utils/apiErr.js";
import {User} from "../models/user.models.js";
import uploadFileToCloudinary from "../utils/uploadFiles.js";
import apiRes from "../utils/apiRes.js";
import jwt from 'jsonwebtoken';

const registerUser = requestHandler(async (req, res) => {
   const { userName, email, fullName, password } = req.body;

   if ([userName, email, fullName, password].some((field) => field?.trim() === "")) {
      throw new apiError(400, "All fields are required");
   }

   const userExists = await User.findOne({ $or: [{ email }, { userName }] });
   if (userExists) {
      throw new apiError(409, "Username or email already exists");
   }

   const avatarPath = req.files?.avatar?.[0]?.path;
   const coverPath = req.files?.cover?.[0]?.path;

   if (!avatarPath) {
      throw new apiError(400, "Avatar image is required");
   }

   const avatarUrl = await uploadFileToCloudinary(avatarPath);
   const coverUrl = coverPath ? await uploadFileToCloudinary(coverPath) : "";

   if (!avatarUrl) {
      throw new apiError(400, "Avatar upload failed");
   }

   const user = await User.create({
      fullName,
      avatar: avatarUrl,
      cover: coverUrl,
      email,
      userName: userName.toLowerCase(),
      password
   });

   const createdUser = await User.findById(user._id).select("-password -refreshToken");
   if (!createdUser) {
      throw new apiError(500, "User creation failed");
   }

   return res.status(201).json(new apiRes("User created successfully", 201, createdUser));
});


const generateAccessTokenandRefreshtoken = async (userId) => {
      try {
         const user = await User.findById(userId);
         if (!user) {
            throw new apiError(404, "User not found");
         }

         const accessToken = user.generateAccessToken();
         const refreshToken = user.generateRefreshToken();

         user.refreshToken = refreshToken;
         await user.save({ validateBeforeSave: false });

         return { accessToken, refreshToken };
      } catch (error) {
         throw new apiError(500, "Failed to generate tokens");
      } };

const loginUser = requestHandler(async (req, res) => {
   const { email, password ,userName} = req.body;

   if ([email, password].some((field) => field?.trim() === "")) {
      throw new apiError(400, "Email and password are required");
   }

   const user = await User.findOne({ $or: [{ email }, { userName }] });
   if (!user) {
      throw new apiError(401, "Invalid email or password");
   }
   
   const isPasswordValid = await user.comparePassword(password);
   if (!isPasswordValid) {
      throw new apiError(401, "Invalid email or password");
   }
 const {refreshToken, accessToken} = await generateAccessTokenandRefreshtoken(user._id)
 const loggedUser = await User.findById(user._id).select("-password -refreshToken");
 const options = {
   httpOnly: true,
   secure: true,
 };

 return res.status(200).cookie("refreshToken", refreshToken, options)
 .cookie("accessToken", accessToken, options)
 .json(new apiRes("User logged in successfully", 200, { accessToken, refreshToken, user: loggedUser }));
});


const logoutUser = requestHandler(async (req, res) => {
  await user.findByIdAndUpdate(req.user._id, { refreshToken: null }, { new: true });
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  return res.status(200).json(new apiRes("User logged out successfully", 200));

  const options = {
    httpOnly: true,
    secure: true,
  };
});


const refreshaccessToken  = requestHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
       throw new apiError(401, "Unauthorized request");
    }
   
    try {
       const decodedToken = jwt.verify(incomingRefreshToken, process.env.Refresh_Token_Secret);
       const user = await User.findById(decodedToken?._id);
       if (!user) {
          throw new apiError(401, "Invalid refresh token");
       }
   
       if (incomingRefreshToken !== user?.refreshToken) {
          throw new apiError(401, "Refresh token expired or used");
       }
   
       const { accessToken, newrefreshToken } = await generateAccessTokenandRefreshtoken(user._id);
   
       const options = {
          httpOnly: true,
          secure: true,
       };
   
       return res.status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new apiRes("Access token refreshed", 200, { accessToken, refreshToken : newrefreshToken }));
    } catch (error) {
       throw new apiError(401, error?.message || "Invalid refresh token");
    }
});

    

export default { registerUser, loginUser, logoutUser , refreshaccessToken };
