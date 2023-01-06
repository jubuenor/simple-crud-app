const User = require("../models/users.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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
        username: req.body.password,
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

exports.remove = (req,res)=>{
        User.findByIdAndRemove(req.params.id,
            (err)=>{
            if(err){
                console.log(err),
                response.succ = false,
                response.msg = "Error deleting user"
                res.json(response)
                return;
            }
            response.succ=true,
            response.msg = "User successfully deleted"
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