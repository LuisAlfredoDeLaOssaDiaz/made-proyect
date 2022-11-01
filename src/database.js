const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/curso-mdb', {
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