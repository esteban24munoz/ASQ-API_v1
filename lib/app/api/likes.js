const { Likes } = require('../../models/likeSchema.js');
const { Post } = require('../../models/postSchema.js');
const common = require('./common.js');
const post = require('./posts.js');

//GET /likes/:postid 
async function getAllLikes(req, res){

    const { postID } = req.params;

    //finds the post using the reference
    const likes = await Likes.find({post: postID});
    const usernames = likes.map(like => like.user);
    res.json(usernames);
}

//GET /likes/:postid/:username
async function isPostLiked(req, res){
    const { postId } = req.params;
    const { username } = req.params;
    const likeExists = await Likes.findOne({post: postId, user: username});

    if(likeExists){
        res.json(true);
    }
    else{
        res.json(false);
    }
}

//POST /likes/:postid/:username
async function createLike(req, res){
    const { postid } = req.params;
    const { username } = req.params;

    let like = new Likes({ post: postid, user: username})
    try{
        await like.save();
        // it worked!  OK to increment the count
        await Post.updateOne({ _id: req.params.postid }, { $inc: { likeCount: 1 } })
        res.json({created: true});
    }
    catch(err){
        common.jsonError;
    }
}

//DELETE /likes/:postid/:username
async function deleteLike(req, res){
    const { postid } = req.params;
    const { username } = req.params;
    const Like = await Likes.findOne({ post: postid, user: username});

    if(!Like){
        return(common.notFound(req,res));
    }
    
    let deletedCount = await Likes.deleteOne({id: Like._id});

    if (deletedCount > 0) {
        // it worked!  OK to decrement the count
        await Post.updateOne({ _id: postid }, { $inc: { likeCount: -1 }});
    }
    res.json(false);
}

module.exports = {
    getAllLikes,
    isPostLiked,
    createLike,
    deleteLike
}