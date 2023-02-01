const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{ type : Object , "default" : {} },
    body:{type:String, required:true, max: 250},
    feeling:{type:String, required:false, max: 60},
    location:{type:String, required:false, max: 26},
    date:{type:String, required:true, max: 60},
    like_count:{type:String, required:true, max: 10}
});

module.exports = mongoose.model("post",PostSchema);