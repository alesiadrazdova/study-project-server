const { Schema, model } = require('mongoose');

const Event = new Schema({
    nameevent: { type: String, unique: true, required: true },
    description: { type: String },
    datestart: { type: String, required: true },
    dateend: { type: String, required: true },
    registstart: { type: String, required: true },
    registend: { type: String, required: true },
    address: { type: String, required: true },
    picture: {type: String}
});

module.exports = model('Event', Event);
