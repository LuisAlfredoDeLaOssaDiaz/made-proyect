const mongoose = require('mongoose');
// curso-mdb
// mongoose.connect('mongodb://localhost/curso-mdb', {
mongoose.connect('mongodb+srv://tuvocacion:1234567890@cluster0.78njnur.mongodb.net/?retryWrites=true&w=majority', {
    /*
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true
    */
})
    .then(db => {
        console.log('DB is connect.');
    })
    .catch(err => { console.error(err) });