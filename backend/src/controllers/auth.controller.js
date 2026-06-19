import axios from "axios";
import {User} from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const googleLogin = asyncHandler(async (req, res) => {
    const { googleToken } = req.body;
    if(!googleToken){
        throw new ApiError(400, "Google token is required");
    }

    let googleUser;
    try {
        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${googleToken}` }
        });
        googleUser = data;
    } catch (error) {
        throw new ApiError(401, "Invalid Google Token");
    }

    const { name, email, picture, sub: googleId } = googleUser;

    let user = await User.findOne({ email });

    if(!user){
        user = await User.create({
            name, 
            email,
            googleId,
            avatar: picture,
        })
    } else {
        user.avatar = picture;
        user.name = name;
        await user.save({ validateBeforeSave: false });
    }

    const accessToken = user.generateAccessToken();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    return res.status(200).cookie("accessToken", accessToken, cookieOptions).json(
        new ApiResponse(
            200, 
            {
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
            },
            "User logged in successfully"
        )
    );
})


export const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200).json(new ApiResponse(200, req.user, "Current user fetched successfuly"));
})