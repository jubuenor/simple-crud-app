const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type: String, required:true, max: 60},
    last_name:{type:String, required:true, max: 60},
    username:{type:String, required:true, max: 60},
    password:{type:String, required:true, max: 60},
    likes:{ type : Array , "default" : [] },
});

module.exports = mongoose.model("user",UserSchema);