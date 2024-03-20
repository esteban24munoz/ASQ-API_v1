const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../../logger.js');
const items = require('./items.js');
const posts = require('./posts.js');
const likes = require('./likes.js');
const common = require('./common.js');

const router = express.Router();

router.use(bodyParser.json());

router.param('questionid', posts.lookupQuestion);

router.route('/questions')
    .get(posts.getAllQuestions)
    .post(posts.createQuestion)
    .all(common.unsupportedMethod);

router.route('/questions/:questionid')
    .get(posts.getSpecificQuestion)
    //.put(posts.updateSpecficQuestion)
    .all(common.unsupportedMethod);
    //.put(posts.updateQuestion)
    //.all(common.unsupportedMethod);

// router.route('/items/:username')
//     .get(items.getItemsForUser)
//     .post(items.createItemForUser)
//     .all(common.unsupportedMethod);


router.use(common.notFound);
router.use(common.InternalServerError);

module.exports = { router };