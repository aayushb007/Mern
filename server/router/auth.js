const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


require('../db/conn');
const User = require("../model/userSchema");
router.get('/',(req,res)=>{
    res.send("hello dude from auth.js");
    
});

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword} = req.body;
    
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
             return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
             return res.status(422).json({ error: "password are not matching" });
        } else {
             const user = new User({ name, email, phone, work, password, cpassword });
            // yeha pe 
            await user.save();
            res.status(201).json({ message: "user registered successfuly" });
        }
        

  
    } catch (err) {
        console.log(err);
    }

});

router.post('/signin', async(req, res) => {
     
    


    try{
        const { email, password} = req.body;
    
                 if ( !email || !password ) {
                     return res.status(422).json({ error: "Plz filled the field properly" });
                     }

        const userLogin = await User.findOne({ email: email });
        if(userLogin){
            const  isMatch = await bcrypt.compare(password,userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });
           // console.log(userLogin);
            if(!isMatch){
                return res.status(400).json({ error: "invalid cridentials pass" });
            }
            return res.json({ error: "user signin  successfully" });


        }else{
            return res.status(400).json({ error: "invalid cridentials" });
        }
       

    }
    catch(err){
        console.log(err);


    }
});

module.exports = router;
