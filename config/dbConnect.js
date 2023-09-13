require('dotenv').config()
const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connected = await mongoose.connect("mongodb://127.0.0.1:27017/mydb").then(()=>{console.log("database connected...");}).catch((err)=>{console.log(err);})
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB; 