const { Item } = require('../../models/item.js');
const common = require('../common.js');

async function getItemsForUser(req, res){
    const username = req.params.username;

    const items = await Item.find({username});

    res.json(items);
}

async function createItemForUser(req, res){
    const username = req.params.username;

    let item = new Item({
        username, 
        text: req.body.text,
        done: req.body.done ? true: false
    });

    await item.save();

    res.json(item);
}

async function lookUpItem(req, res, next, itemid){
    let item = await Item.findById(itemid);

    if(item){
        res.locals.item = item;
        next();
    }
    else{
        common.notFound(req, res);
    }
}

async function updateItem(req, res){
    let item = res.locals.item;

    item.text = req.body.text;
    item.done = req.body.done;
    
    await item.save();

    res.json(item);
}

async function deleteItem(req, res){
    let item = res.locals.item;

    await Item.deleteOne({ _id: item._id });

    res.json(item);
}

module.exports = {
    getItemsForUser,
    createItemForUser,
    lookUpItem,
    updateItem,
    deleteItem
}