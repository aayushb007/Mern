const dotenv = require("dotenv");
//const mongoose= require("mongoose");
const express= require("express");
const app = express();


dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));
//const User = require('./model/userSchema')
const PORT = process.env.PORT;

const middleware=(req,res,next)=>{
    console.log("hello");
    next();
    
}

app.get("/",(req,res)=>{
  res.send("hello dude")
})
app.get("/contact",(req,res)=>{
    res.send("hello contact")
 })
 app.get("/about",middleware,(req,res)=>{
    res.send("about")

 })

 app.get("/service",(req,res)=>{
    res.send("hello services")
  })
app.listen(PORT,()=>{
    console.log(PORT);
})