const validator = require('validator')
const jwt  = require('jsonwebtoken')
const argon2 = require('argon2')

const User = require('../module/userModule.js')

const createToken = (_id, email, role) => {
  return jwt.sign({ _id, email, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const signupUser = async(req,res)=>{
    try{
        const {user_name,email,password} = req.body
        
        if(!email||!user_name||!password){
            throw new Error("Please fill all the fields!");
        }
        if(!validator.isEmail(email)){
            throw new Error("Enter valid email!");
        }
        
        
        const user =  await User.findOne({email});

        if(user){
                const isMatch = await user.comparePassword(password);
                if(!isMatch){
                    throw new Error("Password incorrect!");
                }
            
                await user.save();
                
                const token = createToken(user._id.toString(),user.email,user.role);
                res.cookie("jwt",token,{
                    httpOnly:true,
                    sameSite:"strict",
                    secure:true,
                    maxAge:24*60*60*1000
                })
                req.user = user;
                return res.status(200).json({
                    message: "Logged in successfully!",
                    user: { name: user.user_name, email: user.email},
                    token, 
                });
        }
        const newUser = new User({
            user_name,
            email,
            password,
        })
        
        const newEntry = await newUser.save();
        const token = createToken(newEntry._id.toString(),newEntry.email,newEntry.role);
        
        res.cookie('jwt',token,{
            httpOnly:true,
            sameSite:"strict",
            secure:true,
            maxAge:24*60*60*1000
        })

        res.status(201).json({user:{name:newEntry.user_name,email:newEntry.email,role:newEntry.role},
        });
    }catch(err){
        res.clearCookie("jwt");
        res.status(err instanceof Error ? 400 : 500).json({ message: err.message });
       
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

        const user = await User.findOne({email});
        if(!user){
            throw new Error("User is not registered");
        }
        
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            throw new Error("Password incorrect!");
        }
    
        
        
        const token = createToken(user._id.toString(),user.email,user.role);
        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:true,
            maxAge:24*60*60*1000
        })
        req.user = user;
       res.status(200).json({
        message: "Logged in successfully!",
        user: { name: user.user_name, email: user.email ,role: user.role },
       
    });
    }catch(err){
        if(!res.headersSent){
            res.clearCookie("jwt")
            res
                .status(err instanceof Error ?400:500)
                .json({message:err.message})
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
