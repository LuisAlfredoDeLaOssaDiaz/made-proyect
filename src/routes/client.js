const express = require('express');
const router = express.Router();

const Client = require('../models/Client'); // work to get post push delete
/* == REGISTER == */

router.get('/contactanos', (req, res) => {
    res.render("contactanos");
});

router.post('/contactanos', async (req, res) => {
    const { name, email, telefono, description } = req.body;

    const errors = [];
    if (!name) {
        errors.push({ text: 'Please Write your Full Name.' });
        //req.flash('error_msg', 'Please Write your Full Name.');
    }
    if (!email) {
        errors.push({ text: 'Please Write your Email.' });
        //req.flash('error_msg', 'Please Write your Email.');
    }
    if (!telefono) {
        errors.push({ text: 'Please Write your Cellphone Number.' });
        //req.flash('error_msg', 'Please Write your Password.');
    }
    if (!description) {
        errors.push({ text: 'Please Write a description.' });
        //req.flash('error_msg', 'The Passwords are not equally.');
    }
    if (errors.length > 0) {
        res.render('contactanos', {
            errors,
            name,
            email,
            telefono,
            description
        });
    } else {
        const newClient = new Client({ name, email, telefono, description });
        // console.log(newUser);
        await newClient.save();
        req.flash('success_msg', 'You are registered.');
        res.redirect('/');
    }
});

module.exports = router;

