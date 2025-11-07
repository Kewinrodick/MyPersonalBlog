const validator = require('validator')
const jwt  = require('jsonwebtoken')
const argon2 = require('argon2')

const User = require('../module/userModule.js')

const createToken = (_id,email)=>{
    return jwt.sign({_id,email},process.env.JWT_SECRET,{expiresIn:"1d"});
}

const signupUser = async(req,res)=>{
    try{
        const {user_name,email,password} = req.body
        
        if(!email||!user_name||!password){
            throw new Error("Please fill all the fields!");
        }
        if(!validator.isEmail(email)){
            throw new Error("Enter valid email!");
        }
        if(!validator.isStrongPassword(password)){
            throw new Error("Password is not strong enough!");
        }
        
        const exists =  await User.findOne({email});
        console.log(exists)
        if(exists){
            throw new Error("Email already exists!");
        }
        const newUser = new User({
            user_name,
            email,
            password
        })
        
            if(email === "rodickkewin@gmail.com"){
                exists.role = 'admin';
            }
            else{
                exists.role = 'user';
            }
        
        const newEntry = await exists.save();
        const token = createToken(newEntry._id.toString(),newEntry.email);
        
        res.cookie('jwt',token,{
            httpOnly:true,
            sameSite:"strict",
            secure:true,
            maxAge:24*60*60*1000
        })

        res.status(201).json({
            name:newEntry.user_name,
            email:newEntry.email,
            message:"User Registered successfully",
        },token);
    }catch(err){
        if(err instanceof Error){
            console.error(err.message);
            res.clearCookie("jwt");
            res.status(400).json({message:err.message})
        }
        else{
            console.error(err.message);
            res.clearCookie("jwt");
            res.status(500).json({message:"Internal Server Error"});
        }
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            throw new Error("Please fill all the fields!")
        }
        if(!validator.isEmail(email)){
           throw new Error("Enter valid email!");
       }

        const exists = await User.findOne({email});
        if(!exists){
            throw new Error("User is not registered");
        }
        
        const isMatch = await exists.comparePassword(password);
        if(!isMatch){
            throw new Error("Password incorrect!");
        }
        
            if(email === "rodickkewin@gmail.com"){
                exists.role = 'admin';
            }
            else{
                exists.role = 'user';
            }
            await exists.save();
        
        const token = createToken(exists._id.toString(),exists.email);
        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:true,
            maxAge:24*60*60*1000
        })

       res.status(200).json({
        message: "Logged in successfully!",
        user: { name: exists.user_name, email: exists   .email },
        token, 
    });
    }catch(err){
        if(err instanceof Error){
            console.error(err.message);
            res.clearCookie("jwt");
            res.status(400).json({message:err.message})
        }else{
            console.error(err.message);
            res.clearCookie("jwt");
            res.status(500).json({message:"Internal Server Error"})
        }
    }
}

const logoutUser =  async(req,res)=>{
    try{
        res.clearCookie('jwt')
        res.status(200).json({message:"Logged out successfully!"})
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {signupUser,loginUser,logoutUser}


// | Action            | Method                                |
// | ----------------- | ------------------------------------- |
// | Set JWT in cookie | `res.cookie("token", token, options)` |
// | Read JWT          | `req.cookies.token`                   |
// | Delete JWT        | `res.clearCookie("token")`            |
