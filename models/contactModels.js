const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"User"
    },
    name:{
        type: String,
        required:true
    },
    roll:{
        type : Number
    },
    email:{
        type:String,
        required:[true],
        unique:[true]
    },
},{
    timestamps: true
})

const contactModel = mongoose.model('Contact',contactSchema)

module.exports = contactModel
