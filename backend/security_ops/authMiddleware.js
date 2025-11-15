    const jwt = require('jsonwebtoken')
    const User = require('../module/userModule.js')

    const requireAuth = async(req,res,next)=>{
        try{
            if(req.path == '/api/auth/login'|| req.path == '/api/auth/signup'){
                return next();
            }
            
            let token ='';
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            } 
           
            else if (req.cookies && req.cookies.jwt) {
                token = req.cookies.jwt;
            }

            if (!token) return res.status(401).json({ error: "Authentication token required" });
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            
            const user =await  User.findById(decoded._id).select('-password');

            if(!user){
                return res.status(401).json({ message: 'User not found' });
            }

            if(user.role === 'user'){
                return res.status(403).json({ error: 'Access denied: insufficient permissions' });
            }
            
            req.user = user;
            next();
        }catch(err){
            console.error(err.message);
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
    module.exports = requireAuth;