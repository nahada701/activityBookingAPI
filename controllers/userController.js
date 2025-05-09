const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const { registerValidation, loginValidation } = require('../validators/validators');
exports.userRegistrationController = async (req, res) => {
    console.log("Inside user registration controller");

    const { error } = registerValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone, password } = req.body;

    try {
        if (!name || !email || !phone || !password) {
            return res.status(400).json("Incomplete form data");
        }

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json("User already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new users({ name, email, phone, password: hashedPassword });

        await newUser.save();

        res.status(200).json("User registered successfully");
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

exports.userLoginController=async (req,res)=>{
    console.log("Inside user login controller")
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const{email,password}=req.body
    try{
        const existingUser=await users.findOne({email})
        if (!existingUser) {
            return res.status(404).json("User not found");
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json("Invalid password");
        }

        const token=jwt.sign({userId:existingUser._id},process.env.jwt_password)
        res.status(200).json({user:existingUser,token})

    }
    catch(err){
        res.status(500).json({ error: "Server error", details: err.message });  
    }



}
