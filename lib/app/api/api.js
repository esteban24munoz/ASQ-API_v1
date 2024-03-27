const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../../logger.js');
const posts = require('./posts.js');
const likes = require('./likes.js');
const common = require('./common.js');
const { requireLogin } = require('./auth.js');
const router = express.Router();

router.use(bodyParser.json());
router.use(requireLogin);
router.param('questionid', posts.lookUpQuestion);
router.param('answerid', posts.lookUpAnswer);
router.param('postid', likes.lookUpPostId);

router.route('/questions')
    .get(posts.getAllQuestions)
    // .all(requireWritePermissions)
    .post(posts.createQuestion)
    .all(common.unsupportedMethod);

router.route('/questions/:questionid')
    //.all(requireLogin)
    .get(posts.getSpecificQuestion)
   //.all(requireWritePermissions)
    .put(posts.updateQuestion)
    .all(common.unsupportedMethod);

router.route('/questions/:questionid/answers')
    .get(posts.getAllAnswers)
    //.all(requireWritePermissions)
    .post(posts.createSpecificAnswer)
    .all(common.unsupportedMethod);


router.route('/answers/:answerid')
    .get(posts.getSpecificAnswer)
    //.all(requireWritePermissions)
    .put(posts.updateSpecificAnswer)
    .all(common.unsupportedMethod);

router.route('/likes/:postid')
    .get(likes.getAllLikes)
    .all(common.unsupportedMethod);

router.route('/likes/:postid/:username')
    .get(likes.isPostLiked)
    .post(likes.createLike)
    .delete(likes.deleteLike)
    .all(common.unsupportedMethod);


router.use(common.notFound);
router.use(common.InternalServerError);

module.exports = { router };