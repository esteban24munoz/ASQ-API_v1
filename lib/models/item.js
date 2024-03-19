const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    username: String,
    text: String,
    done: Boolean
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item };