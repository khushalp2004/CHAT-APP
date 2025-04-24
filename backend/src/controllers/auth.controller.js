import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const register = async(req, res) => {
    const{fullName,email,password}=req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //include these conditions after all checks are done and app is free to use
        // if(!email.includes("@")){
        //     return res.status(400).json({message:"Please enter a valid email"});
        // }
        // if(!/^[a-zA-Z0-9]+$/.test(fullName)){
        //     return res.status(400).json({message:"Full name can only contain letters and numbers"});
        // }
        // if(fullName.length<3 || fullName.length>20){
        //     return res.status(400).json({message:"Full name must be between 3 and 20 characters"});
        // }
        // if(!/^[a-zA-Z0-9]+$/.test(password)){
        //     return res.status(400).json({message:"Password can only contain letters and numbers"});
        // }
        // if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)){
        //     return res.status(400).json({message:"Password must contain at least one uppercase letter, one lowercase letter, and one number"});
        // }
        // if(password.includes(" ")){
        //     return res.status(400).json({message:"Password cannot contain spaces"});
        // }
        // if(password.length>20){
        //     return res.status(400).json({message:"Password cannot be more than 20 characters"});
        // }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        const user=await User.findOne({email});

        if(user)
            return res.status(400).json({message:"User already exists"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        const newUser=new User({
            email,
            fullName,
            password:hashedPassword,
        })
        if(newUser){
            //generate jwt token
            generateToken(newUser._id,res);
            //save user to db
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                email:newUser.email,
                fullName:newUser.fullName,
                profilePic:newUser.profilePic,
            });
        }else{
            return res.status(400).json({message:"Invalid credentials"});
        }
    }
    catch(err){
       console.log("Error in signup controller",err.message);
       res.status(500).json({message: "Internal Server Error"})
    }
}
export const login = async(req, res) => { 
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
            profilePic:user.profilePic,
        });
    }
    catch(err){
        console.log("Error in login controller",err.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}
export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message:"Logged out successfully"});
    }
    catch(err){
        console.log("Error in logout controller",err.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateProfile = async(req, res) => {
    try{
        const {profilePic}=req.body;
        const userId=req.user._id

        if(!profilePic){
            return res.status(400).json({message:"Please provide a profile picture"});
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic);

        const updatedUser=await User.findByIdAndUpdate(userId,{
            profilePic:uploadResponse.secure_url,
        },{new:true});

        if(!updatedUser){
            return res.status(400).json({message:"User not found"});
        }

        res.status(200).json(updatedUser);
    }catch(err){
        console.log("Error in updateProfile controller",err.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(err){
        console.log("Error in checkAuth controller",err.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}