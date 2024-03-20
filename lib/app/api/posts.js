const { Question,  Answer} = require('../../models/postSchema.js');
const { respondJson } = require('../../models/jsonSchema.js');
const common = require('../common.js');

async function getAllQuestions(req, res) {

    // look up questino and populate it in one step:
    questions = await Question.find({reference: undefined});

    res.json(questions);
}

async function getSpecificQuestion(req, res){
    
}


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
    createQuestion,
    getAllQuestions,
    getSpecificQuestion
}
