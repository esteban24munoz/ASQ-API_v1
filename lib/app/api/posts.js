const { Post } = require('../../models/postSchema.js');
const { respondJson } = require('../../models/jsonSchema.js');
const common = require('../common.js');
const { verbose } = require('winston');

//look up QUESTION. If it founds it calls next for the next function
async function lookUpQuestion(req, res, next, questionid){
    let question = await Post.findById(questionid);
    if(question){
        res.locals.question = question;
        next();
    }else{
        common.notFound(req,res);
    }
}


async function createQuestion(req, res, next){

    let question = new Post({
        summary: req.body.summary || "", 
        contents: req.body.contents,
        author: req.body.author,
        likeCount: req.body.likeCount
    });

    try{
        await question.save();
        res.json(question);
    }
    catch(err) {
        next(err);
    }
}


//GET /questions
async function getAllQuestions(req, res) {

    // look up questino and populate it in one step:       
    const questions = await Post.find({reference: undefined});

    res.json(questions);
}

// /question/:questionid
async function getSpecificQuestion(req,res){
    res.json(res.locals.question); 
}

//PUT /question/:questionid
async function updateQuestion(req, res){

    let question = res.locals.question;

    if(!question || question.reference){
        common.notFound(req, res);
    }

    //Later we will have to add on who want to edit the questions
    question.summary = req.body.summary ? req.body.summary : " ";
    question.contents = req.body.contents;
    question.edited = new Date();  
    question.author =req.body.author;
    await question.save();
    res.json(question);
}

//-------------------------ANSWER--------------------------
async function createSpecificAnswer(req,res, next){

    try{
        //input validation
        const questionId = req.params.questionid;

        let question = await Post.findById(questionId);

        //create the answer
        let answers = new Post({
            contents: req.body.contents,
            author: req.body.author,
            likeCount: req.body.likeCount,
            reference: questionId
        });

        await answers.save();
        res.json(answers);
    }catch(err){
        next(err);
    }
}

async function getAllAnswers(req,res){
    

}
async function getSpecificAnswer(req,res){
    

}
async function updateSpecificAnswer(req,res){
    

}


function errorHandler(req, res, next, err) {

    //validation errors
    //err.name is a string that identifies the error name object
    if (err.name === "ValidationError") {
        let invalid = { };

        for (let field in err.errors) {
            //errors[] property contains several things that went wrong
            invalid[field] = err.errors[field].message;
        }

        res.status(400);
        res.json({ message: "Invalid parameter values", invalid });
    }

    //creating or updating a record violates a unique index, 
    //the save method will throw an exception
    if (err.name === 'MongoServerError' && err.code === 11000) {
        res.status(400);
        res.json({ message: err.message });
    }
}

module.exports = {
    getAllQuestions,
    createQuestion,
    lookUpQuestion,
    getSpecificQuestion,
    updateQuestion,
    createSpecificAnswer,
    getAllAnswers,
    getSpecificAnswer,
    updateSpecificAnswer,
    errorHandler
}
