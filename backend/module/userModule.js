const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
                user_name:{
                    type:String,
                    required:[true,"UserName is required"]
                },
                email:{
                    type:String,
                    required:[true,"Email is required"],
                    unique:true,
                    lowercase:true,
                },
                password:{
                    type:String,
                    required:[true,"Password is required"],
                    minlength:8,
                },
                role:{
                    type:String,
                    enum:['admin','user'],
                    default:'user'
                }
            },

            {timestamps:true}
);
//hashing middleware
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next(); //only hash if password changes.

    try{
        this.password = await argon2.hash(this.password);
        next();
    }catch(err){
        next(err);
    }
});

//Comparing passwords
UserSchema.methods.comparePassword = async function(comparingPassword){
    return await argon2.verify(this.password,comparingPassword);
}
const User = mongoose.model('User',UserSchema);
module.exports = User;