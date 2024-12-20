import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/datauri.js";
import Cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Required fields are missing.",
        success: false,
      });
    }

    //Cloudinary setup
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await Cloudinary.uploader.upload(fileUri.content);

    // Check for valid role
    if (!["student", "recruiter"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role.",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Required fields are missing.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password.",
        success: false,
      });
    }

    console.log("User Role: ", user.role);  // Log user role for debugging
    console.log("Requested Role: ", role);
    if (role !== user.role) {
      return res.status(403).json({
        message: "Access denied for this role.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    if (!process.env.SECRET_KEY) {
      console.error("JWT Secret Key is not set.");
    }
    

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}!`,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
        success: true,
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Succesfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id; // Populated by middleware

    const file = req.file;

    // cloudniary setup idhar kiye hai
    const fileUri = getDatauri(file);
    const cloudResponse = await Cloudinary.uploader.upload(fileUri.content);

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "Required fields are missing.",
        success: false,
      });
    }

    // Validate skills as an array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Update user data
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // File handling logic (e.g., Cloudinary) can be added here
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the url
      user.profile.resumeOriginalName = file.originalname; //save the original file name
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};
