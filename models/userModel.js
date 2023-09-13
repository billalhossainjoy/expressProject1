const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true,"please add tha user name"]
    },
    email:{
        type:String,
        required: [true,"please add the user name"],
        unique: [ true, "this email has already taken"]
    },
    password:{
        type: String,
        required:[true, "password required"]
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("User",userSchema);
