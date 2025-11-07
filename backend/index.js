const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const db_con = require('./db_config/db_con.js')

const requireAuth = require('./security_ops/authmiddleware.js')
const articleRouter = require('./routes/basic_routes.js')
const authRouter = require('./routes/security_routes.js')

dotenv.config()

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requireAuth);
app.use("/api/auth",authRouter);
app.use("/api/articles",articleRouter);

db_con()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("SERVER LISTENING ON PORT: ",PORT)
    })
})
.catch(()=>{ console.error("ERROR OCCURED"); process.exit(1);}
)
