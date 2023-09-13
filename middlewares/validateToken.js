const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const validateTokent = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader  = req.headers.authorization 
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]
        jwt.verify(token,'jwtsecret',(err, decodedInfo) =>{
            if(!err){
                req.user = decodedInfo.user
                next()
            }else{
                res.status(401);
                throw new Error('user not authorized')
            }
        })
    }else{
        console.log('not found token')
        res.status(401)
        throw new Error('invalid user...')
    }
})

module.exports = validateTokent

