const mongoose = require('mongoose')


const db_con = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE SUCCESSFULLY CONNECTED !!! 🫂😉")

    }catch(err){
        console.log("ERROR OCCURED! 💢💢💢");
        process.exit(1);
    }
}

module.exports = db_con;