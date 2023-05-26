const User = require("../models/User");

const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req,res) => {
    const NewUser = new User({
        username : req.body.username,
        email: req.body.email,
        password : CryptoJS.AES.encrypt( req.body.password, process.env.PASS_SEC).toString(),
    });


    try{
        const savedUser = await NewUser.save();
        //console.log(savedUser);
        res.status(201).json(savedUser);
    }
    catch(error){
       res.status(500).json(error);
       console.log(error)
    }
    
});

//LOGIN
 router.post("/login", async (req,res) =>{
    try{
        const user = await User.findOne({ username : req.body.username});
           console.log(user);
        !user && res.status(401).json("Wrong Credentials");
    
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
    
        console.log(hashedPassword);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
        const inputPassword = req.body.password;
    
        originalPassword != inputPassword && res.status(401).json("Wrong Password");

        const AccessToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin,
        }, process.env.JWT_SEC , {expiresIn:"3d"} )

        const { password , ...others} = user._doc;

        res.status(200).json({...others , AccessToken});
            
    }catch(error){
        res.status(500).json(error);
    }
    
 })

module.exports = router;