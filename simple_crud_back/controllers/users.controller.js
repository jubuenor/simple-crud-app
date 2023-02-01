const User = require("../models/users.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Posts = require("../models/posts.model");

let response= {
    msg: "",
    succ: false
}

exports.login = (req,res,next)=>{
    let hashedpass = crypto.createHash("sha512").update(req.body.password).digest("hex");
    User.findOne({username:req.body.username, password: hashedpass},(err,user)=>{
        let response={
            token:null
        }
        if(user!==null){
            response.token=jwt.sign({
               id:user._id,
               user:user.user
            },"__recret__",
            {expiresIn:"12h"});
        }
        res.json(response);
    });
}

exports.create = (req,res)=>{
    let hashedpass = crypto.createHash("sha512").update(req.body.password).digest("hex");
    let user = new User({
        name: req.body.name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedpass,
        likes:[]
    });
    user.save((err)=>{
        if(err){
            console.log(err),
            response.succ = false,
            response.msg = `Error saving user: ${err}`
            res.json(response)
            return;
        }
        response.succ=true,
        response.msg = "User successfully saved"
        res.json(response)
    });
}

exports.findOne = (req,res)=>{
    let token= jwt.decode(req.params.token)
    User.findOne({_id: token.id},(err,user)=>{
        res.json(user);
    });
}


exports.update = (req,res)=>{
    let user = ({
        name: req.body.name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        likes: req.body.likes
    });
    User.findByIdAndUpdate(req.params.id,{$set: user},
        (err)=>{
        if(err){
            console.log(err),
            response.succ = false,
            response.msg = "Error saving user"
            res.json(response)
            return;
        }
        response.succ=true,
        response.msg = "User successfully saved"
        res.json(response)
    });
}

exports.remove=(req,res)=>{
    let hashedpass = crypto.createHash("sha512").update(req.body.inputpass).digest("hex");
    if(req.body.user.password===hashedpass){
        response.succ=true,
        response.msg = "Passwords match"
        console.log(req.body.user)
        Posts.deleteMany({user:{id:req.body.user._id,name:req.body.user.name,last_name:req.body.user.last_name,username:req.body.user.username}}).then((response)=>{
            User.findByIdAndRemove(req.body.user._id,
                (err)=>{
                if(err){
                    console.log(err),
                    response.succ = false,
                    response.msg = "Error deleting user"
                    return;
                }
                response.succ=true,
                response.msg = "User successfully deleted"
            });
        }).catch((error)=>{
            console.log(error)
            response.succ = false,
            response.msg = "Error deleting user"
        });
        
    }else{
        response.succ=false,
        response.msg = "Passwords do not match"
    }
    res.json(response)
}