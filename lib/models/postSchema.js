const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
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
});


//ANSWER SCHEMA

const answerSchema = new mongoose.Schema({ 
    reference: {
        type: mongoose.Types.ObjectId,
        ref: 'Question'
    },
    contents: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 1000,
        required: true
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
})

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

module.exports = {
    Question,
    Answer
};