const { Question,  Answer} = require('../../models/postSchema.js');
const { respondJson } = require('../../models/jsonSchema.js');
const common = require('../common.js');

//look up QUESTION. If it founds it calls next for the next function
async function lookUpQuestion(req, res, next, questionid){
    let question = await Question.findById(questionid);
    if(question){
        res.locals.question = question;
        next();
    }else{
        common.notFound(req,res);
    }
}

//POST /quesions
async function createQuestion(req, res){
    // An admin user may create a question for any username
    // A regular user may only create a question 
    // for their own username
    // const user = req.params.user;
    // const adminUser = req.params.adminUser;

    let question = new Question({
        summary: req.body.summary || '',
        contents: req.body.contents,
        author: req.body.author,
        likeCount: req.body.likeCount
    });

    await question.save();
    res.json(question);
}


//GET /questions
async function getAllQuestions(req, res) {

    // look up questino and populate it in one step:       
    const questions = await Question.find({reference: undefined});

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
async function createSpecificAnswer(req,res, questionid){

    let questionId = await Question.findById(questionid);

    console.log("estas aqui?")
    //create the answer
    let answers = new Answer({
        contents: req.body.contents,
        author: req.body.author,
        likeCount: req.body.likeCount,
        reference: questionId
    });

    await answers.save();
    res.json(answers);
}

async function getAllAnswers(req,res){
    

}
async function getSpecificAnswer(req,res){
    

}
async function updateSpecificAnswer(req,res){
    

}


// async function errorHandler(req, res, next, error) {

//     //validation errors
//     // if (err.name === "ValidationError") {
//     //     let invalid = { };

//     //     for (let field in err.errors) {
//     //         invalid[field] = err.errors[field].message;
//     //     }

//     //     res.status(400);
//     //     res.json({ message: "Invalid parameter values", invalid });
//     // }
// }

module.exports = {
    getAllQuestions,
    createQuestion,
    lookUpQuestion,
    getSpecificQuestion,
    updateQuestion,
    createSpecificAnswer,
    getAllAnswers,
    getSpecificAnswer,
    updateSpecificAnswer
}
