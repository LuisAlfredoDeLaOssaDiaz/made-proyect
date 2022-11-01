const express = require('express');
const router = express.Router();

const Note = require('../models/Notes'); // work to get post push delete
const {isAuthenticated} = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({text: 'Please Write a title.'});
    }
    if (!description) {
        errors.push({text: 'Please Write a desctiption.'});
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        }); 
    } else {
        const newNote = new Note({title, description});
        newNote.user = req.user.id
        //console.log(newNote);
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfull.');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    //res.send('NOTES from database.');
    
    await Note.find({user: req.user.id}).sort({date:1}).then(notes => {
        res.render('notes/all-notes', {
            notes: notes.map(Note => Note.toJSON()) 
        })
    })
});

router.get('/notes/edit/:id', isAuthenticated, (req,res) => {

    Note.findById(req.params.id).then (note=> {
        res.render('notes/edit-note', {
            _id: note._id, 
            title: note.title, 
            description: note.description    
        })
        //console.log("title: " + note.title + " description: " + note.description);
    });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req,res) => {
    
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfull.')
    res.redirect('/notes');
})

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    //console.log(req.params.id);
    //res.send('ok');
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Delete Successfull.')
    res.redirect('/notes');
} ) 


// router.get('/notes', async (req, res) => {
//     //res.send('NOTES from database.');
    
//     const notes = await Note.find();
//     res.render('notes/all-notes', { notes });
// });

/*==================================================================================================*/




module.exports = router;