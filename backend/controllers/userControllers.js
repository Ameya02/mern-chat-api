const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic} = req.body;

    if(!name || !email || !password)
    {
        throw new Error("Please Enter all the fields");

    }
    const userExists = await User.findOne({ email: email });
    if(userExists) {
        throw new Error("User already exists");
    }
    const user = await  User.create({ name: name, email: email, password: password, pic:pic });
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        });
    }
    else{
        throw new Error("Failed to create user");
    }

});

const authUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    if(user && (await user.matchPassword(password)))
    {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profile:user.profile,
            token:generateToken(user._id)
        });
    }
    else{
        res.status(401).json({message:"Invalid email or password"});
    }
})

const getAllUsers = asyncHandler(async(req,res) => {
 const keyword = req.query.search ?
 { 
    $or:
    [
        { name: { $regex: req.query.search, $options: "i"} },
        { email: { $regex: req.query.search, $options: "i"} },
], }: {};
const users =  await User.find(keyword).find({_id:{$ne:req.user._id}});
res.send(users); 
});

const onlineStatus = asyncHandler(async(req,res) => {
 const {userId,status} = req.body
try{
const users =  await User.findByIdAndUpdate(
    userId,{
        online:status
    },
    {
        $new:true
    }
);
res.status(200).json(users)
}
catch (error){
res.status(401).send(error)
}
});

module.exports = {registerUser, authUser, getAllUsers,onlineStatus};