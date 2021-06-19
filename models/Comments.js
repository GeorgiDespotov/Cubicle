const { Schema, model } = require('mongoose');

const schema = new Schema({
    author: { type: String, required: true, maxLength: 20 },
    content: { type: String, required: true, maxLength: 250 }
});

module.exports = model('Comments', schema); 