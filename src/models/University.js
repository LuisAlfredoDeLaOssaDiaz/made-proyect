const mongoose = require('mongoose');
const {Schema} = mongoose;

const UniversitySchema = new Schema ({
    nombre: {type: String},
    ciudad: {type: String, required: true},
    contenido: {type: String, required: true},
    carreras: [{type: Array, required: true}],
    link: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('University',UniversitySchema);
