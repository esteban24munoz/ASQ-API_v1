const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../../logger.js');
const items = require('./items.js');
const posts = require('./posts.js');
const likes = require('./likes.js');
const common = require('./common.js');

const router = express.Router();

router.use(bodyParser.json());

router.route('/questions')
    .get(posts.getQuestions)
    .post(posts.createQuestion)
    .all(common.unsupportedMethod);

// router.param('itemid', items.lookUpItem);

// router.route('/items/:username')
//     .get(items.getItemsForUser)
//     .post(items.createItemForUser)
//     .all(common.unsupportedMethod);

// router.route('/items/:username/:itemid')
//     .put(items.updateItem)
//     .delete(items.deleteItem)
//     .all(common.unsupportedMethod);

router.use(common.notFound);
router.use(common.InternalServerError);

module.exports = { router };