const mongoose = require('mongoose');
const {Schema} = mongoose;

const ClientSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    telefono: {type: Number, required: true},
    description: {type: String, required: true},
    // confirmPassword: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Client', ClientSchema);