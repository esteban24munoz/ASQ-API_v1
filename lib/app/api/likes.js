const { Likes } = require('../../models/likeSchema.js');
const { Post } = require('../../models/postSchema.js');
const common = require('./common.js');
const post = require('./posts.js');

async function lookUpLikes(res, req, next, postid){
    const postId = await Post.findById(postid);
    
    if(postId){
        req.locals.postId = postId;
        next();
    }
    else{
        common.notFound(res, req);
    }
}

//GET /likes/:postid 
async function getAllLikes(req, res){

    //finds the post using the reference
    const likes = await Likes.find({reference: res.locals.postId});
    const usernames = likes.map(like => like.user);
    res.json(usernames);
}

//GET /likes/:postid/:user
async function isPostLiked(req, res){

}

//POST /likes/:postid/:user
async function createLike(req, res){
    const { postId } = req.params;
    const { user } = req.params;

    let like = new Likes({ post: postId, user})
    try{
        await like.save();
        // it worked!  OK to increment the count
        await Post.updateOne({ _id: post.id }, { $inc: { likeCount: 1 } })
        res.json({created: true});

    }
    catch(err){
        common.jsonError;
    }
}

//DELETE /likes/:postid/:username
async function deleteLike(req, res){

}

module.exports = {
    getAllLikes,
    isPostLiked,
    createLike,
    deleteLike,
    lookUpLikes
}
