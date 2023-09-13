const asyncHandler = require("express-async-handler");
const userModel  = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userContoller = {};



// register 
userContoller.postRegister = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(username && email && password){
        const userAvailable = await userModel.findOne({email})
        if(!userAvailable){
            const hashPass =await bcrypt.hash(password,10)
            const user = await userModel.create({
                username,
                email,
                password:hashPass
            }) 
            console.log(`user create ${user}`);
            if(user){
                res.status(201).json({_id:user.id,email:user.email})
            }else{
                throw new Error('user can not created')
            }
            
        }else{
            res.status(401)
            throw new Error("user Already exits")
        }
    }else{
        res.status(404)
        throw new Error("user not found")
    }
});


// login
userContoller.postLogin = asyncHandler(async (req, res) => {
    const {email,password} = req.body
    if(email&& password){
        const user = await userModel.findOne({email})
        if(user){
            const accessToken = jwt.sign(
                {
                    user:{
                        username:user.username,
                        email:user.email,
                        id : user.id
                    }
                },
                'jwtsecret',
                {expiresIn: "30m"}
            )
            res.status(201).json({accessToken})
        }else{
            res.status(400)
            throw new Error('not valid')
        }
        console.log(user)
    }else{
        res.status(400)
        throw new Error('invalid login')
    }
  });


// current
userContoller.getCurrent = asyncHandler(async (req, res) => {
    res.send("user current route");
  });


module.exports = userContoller;
