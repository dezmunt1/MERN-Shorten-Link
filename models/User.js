const { Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, unique: false },
    links: [ { type: Types.ObjectId, ref: 'Link' } ]
});

module.exports = model( 'User', schema );