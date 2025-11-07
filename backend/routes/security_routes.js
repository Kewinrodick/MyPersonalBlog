const express = require('express')



const {signupUser,loginUser,logoutUser} = require('../security_ops/auth.js')
const authRouter = express.Router();

authRouter.post('/signup',(req,res)=>signupUser(req,res));
authRouter.post('/login',(req,res)=>loginUser(req,res));
authRouter.post('/logout',(req,res)=>logoutUser(req,res));

module.exports = authRouter;