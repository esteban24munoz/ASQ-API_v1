const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    summary: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 100,
        require: false,
    },
    contents: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 1000,
        required: true
    },
    reference: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        type: String,
        match: /^[a-zA-Z][a-zA-Z\d]*$/,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    likeCount: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    edited: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {toJSON: {
    getters: false,
    virtuals: false,
    transform: (doc, obj, options) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        return obj;
    }
}});

const Post = mongoose.model('Post', postSchema);

module.exports = {
    Post
};