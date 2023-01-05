const Post = require("../models/posts.model");

let response= {
    msg: "",
    succ: false
}

exports.create = (req,res)=>{
    let post = new Post({
        user: req.body.user,
        body: req.body.body,
        feeling: req.body.feeling,
        location: req.body.location,
        date: req.body.date,
        like_count: req.body.like_count
    });
    post.save((err)=>{
        if(err){
            console.log(err),
            response.succ = false,
            response.msg = `Error saving post: ${err}`
            res.json(response)
            return;
        }
        response.succ=true,
        response.msg = "Post successfully saved"
        res.json(response)
    });
}

exports.remove = (req,res)=>{
        User.findByIdAndRemove(req.params.id,
            (err)=>{
            if(err){
                console.log(err),
                response.succ = false,
                response.msg = "Error deleting post"
                res.json(response)
                return;
            }
            response.succ=true,
            response.msg = "Post successfully deleted"
            res.json(response)
        });
}

exports.update = (req,res)=>{
    let user = ({
        user: req.body.user,
        body: req.body.body,
        feeling: req.body.feeling,
        location: req.body.location,
        date: req.body.location,
        like_count: req.body.location
    });
    User.findByIdAndUpdate(req.params.id,{$set: user},
        (err)=>{
        if(err){
            console.log(err),
            response.succ = false,
            response.msg = "Error saving post"
            res.json(response)
            return;
        }
        response.succ=true,
        response.msg = "Post successfully saved"
        res.json(response)
    });
}