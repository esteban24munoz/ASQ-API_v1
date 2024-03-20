const { Question,  Answer} = require('../../models/postSchema.js');
const { respondJson } = require('../../models/jsonSchema.js');
const common = require('../common.js');


//GET /questions
async function getAllQuestions(req, res) {

    // look up questino and populate it in one step:       
    const questions = await Question.find({reference: undefined});

    res.json(questions);
}

//GET finds the question. If it founds it calls next for the next function
async function lookupQuestion(req, res, next, questionid){
    let question = await Question.findById(questionid);
    if(question){
        res.locals.question = question;
        next();
    }else{
        common.notFound(req,res);
    }
}

// /question/:questionid
async function getSpecificQuestion(req,res){
    res.json(res.locals.question); 
}


//POST /quesions
async function createQuestion(req, res){
    // An admin user may create a question for any username
    // A regular user may only create a question 
    // for their own username
    // const user = req.params.user;
    // const adminUser = req.params.adminUser;

    // try {
        //A NEW SCHEMA REQUIRE FOR SUMMARY?
        let question = new Question({
            summary: req.body.summary || '',
            contents: req.body.contents,
            author: req.body.author,
            likeCount: req.body.likeCount
        });
    
        await question.save();
    
        res.json(question);
    // }
    // catch (err) {
    //     next(err);
    // }
    
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
    lookupQuestion,
    getSpecificQuestion,
}
