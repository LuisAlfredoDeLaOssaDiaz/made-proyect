const express = require('express');
const router = express.Router();

const University = require('../models/University');
const {isAuthenticated} = require('../helpers/auth');

router.get('/stady/university', async (req, res) => {
    
    await University.find().sort({nombre: 1}).then(university => {
        res.render('universitys/all-university', {
            university: university.map(University => University.toJSON())
        })
        // console.log(university[0].carreras[0]);
    })
});
//1047434338Solano
//  buscar universidades por ciudad
router.post('/stady/university', async (req, res) => {
    //res.send('NOTES from database.');
    const {ciudad} = req.body;

    res.redirect('/stady/university/' + ciudad);
});

router.get('/stady/university/:ciudad', async (req, res) => {
    //res.send('NOTES from database.');
    await University.find({ciudad: req.params.ciudad}).sort({date:1}).then(university => {
        res.render('universitys/all-university', {
            university: university.map(University => University.toJSON()) 
        })
    })
});
/*==================================================================================================*/

router.get('/stady/universityadd', (req, res) => {
    res.render('universitys/new-university');
});


router.post('/stady/new-university', async (req, res) => {
    console.log('new-university')
    const {nombre, ciudad, contenido, arrayCarreras, link} = req.body;
    console.log(arrayCarreras);
    const carreras = arrayCarreras.split(',');
    console.log(carreras);

    const errors = [];

    if (!nombre) {
        errors.push({ text: 'Porfavor ingresa nombre' });
    }
    if (!ciudad) {
        errors.push({ text: 'Porfavor ingresa ciudad' });
    }
    if (!contenido) {
        errors.push({ text: 'Porfavor ingresa contenido' });
    }
    if (!arrayCarreras) {
        errors.push({ text: 'Porfavor ingresa carreras' });
    }
    if (!link) {
        errors.push({text: 'Porfavor ingresa link de acceso a la universidad'});
    }
    if (errors.length > 0) {
        res.render('universitys/new-university', {
            errors,
            nombre, 
            ciudad, 
            contenido, 
            carreras, 
            link
        });
    } else {
        const newUniversity = new University({nombre, ciudad, contenido, carreras, link});
        await newUniversity.save();
        req.flash('success_msg', 'Universidad agregada satisfactoriamente');
        res.redirect('/stady/university');
    }
});



module.exports = router;