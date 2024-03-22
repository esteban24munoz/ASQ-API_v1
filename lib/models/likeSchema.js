const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    user:{
        type: String,
        match: /^[a-zA-Z][a-zA-Z\d]*$/,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    post:{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }
});
//user can only like a post one time
likeSchema.index({ post: 1, user: 1 }, { unique: true });

const Likes = mongoose.model('Likes', likeSchema);

module.exports = {
    Likes
};