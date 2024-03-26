const { Post } = require('../../models/postSchema.js');
const { respondJson } = require('../../models/jsonSchema.js');
const { Likes } = require('../../models/likeSchema.js');
const auth = require('./auth.js');
const common = require('./common.js');

//look up QUESTION. If it founds it calls next for the next function
async function lookUpQuestion(req, res, next, questionid){
    let question = await Post.findById(questionid);
    //If you are given the wrong kind of id, 
    //simply respond with a 404 (as if the document was not found).
    if(question.reference === undefined){
        res.locals.question = question;
        next();
    }else{
        common.notFound(req,res);
    }
}

async function lookUpAnswer(req, res, next, answerid){
    let answer = await Post.findById(answerid);
    //If you are given the wrong kind of id, 
    //simply respond with a 404 (as if the document was not found).
    if(answer.reference !== undefined){
        res.locals.answer = answer;
        next();
    }
    else{
        common.notFound(req,res);
    }
}

async function createQuestion(req, res, next){
    console.log('HEre');
    //get username from requireLogin
    //An admin user may create a question for any username
    //A regular user may only create a question for their own username
        let question = new Post({
            summary: req.body.summary || "", 
            contents: req.body.contents,
            author: req.body.author,
            likeCount: 0
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

    //mongoosejs.com,  //should only return the summary no contents      
    const questions = await Post.find({reference: undefined}).select('-contents');
    
    //Delete __v , _id property, use id
    //const transformedQuestion = respondJson.find(questions);

    res.json(questions);
}

// GET/question/:questionid
async function getSpecificQuestion(req,res){
    res.json(res.locals.question); 
}

//PUT /question/:questionid
async function updateQuestion(req, res){

    let updateQuestion = res.locals.question;
    const { summary, contents, author, likeCount } = req.body;

    if(!updateQuestion || updateQuestion.reference){
        common.notFound(req,res);
    }
    
    //validate who is trying to update the question
    updateQuestion.summary = summary ? summary : " ";
    updateQuestion.contents = contents; 
    updateQuestion.author =  author;
    updateQuestion.likeCount = likeCount;
        
    await updateQuestion.save();
    res.json(updateQuestion);
}

//-------------------------ANSWER--------------------------
async function createSpecificAnswer(req,res, next){

    try{
        //create the answer
        let answers = new Post({
            contents: req.body.contents,
            reference: res.locals.question._id,
            author: req.body.author,
            likeCount: req.body.likeCount
        });

        await answers.save();
        res.json(answers);

    }catch(err){
        next(err);
    }
}

async function getAllAnswers(req,res){

    //finds the post using the reference
    const answers = await Post.find({reference: res.locals.question});
    res.json(answers);
    
}
async function getSpecificAnswer(req,res){
    res.json(res.locals.answer); 
}
async function updateSpecificAnswer(req,res){
        
    const updateAnswer = res.locals.answer;
    const {contents, author, likeCount} = req.body;
       
    //validate who is trying to update the question
    updateAnswer.contents = contents; 
    updateAnswer.author =  author;
    updateAnswer.likeCount = likeCount;
        
    await updateAnswer.save();
    res.json(updateAnswer);
}


function errorHandler(req, res, next, err) {

    //SYNTAX ERROR IN BODY OF REQUEST, {name: 'SyntaxError'}.
    if (err.name === 'SyntaxError') {
        res.status(400);
        res.json({ message: err.message });
    }

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

    //Any other error
    res.status(500);
    res.json({ message: "The server encountered an unexpected error"})
}

module.exports = {
    getAllQuestions,
    createQuestion,
    lookUpQuestion,
    lookUpAnswer,
    getSpecificQuestion,
    updateQuestion,
    createSpecificAnswer,
    getAllAnswers,
    getSpecificAnswer,
    updateSpecificAnswer,
    errorHandler
}
