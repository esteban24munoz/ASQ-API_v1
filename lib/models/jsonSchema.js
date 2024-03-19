const mongoose = require('mongoose');

const jsonSchema = new mongoose.Schema({
    /* ...schema definition... */
}, {
    toJSON: {
        getters: false,
        virtuals: false,
        transform: (doc, obj, options) => {
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        }
    }
});

const respondJson = mongoose.model('respondJson', jsonSchema);

module.exports = {
    respondJson
}