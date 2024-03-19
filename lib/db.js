const mongoose = require('mongoose');
const config = require('./config.js');

function connect(){
    return mongoose.connect(`mongodb://${config.dbHost}/${config.dbName}`); 
}

module.exports = { connect };