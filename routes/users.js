var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
let contact = require('../alowares/mailer');

console.log('routes user');

// GET login page
router.get('/login', (req, res) => {
    res.render('user/login')
})

// GET register page
router.get('/register', (req, res) => {
    res.render('user/register')
})

/////////////handle sign up logic////////////////
router.post('/register', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function () {
                req.flash('success', 'Welcome to God\'s Time Meida ' + user.username);
                console.log(req.body);
                res.redirect('/');
            })
        }
    })
});


///////////////handle login logic//////////////
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res, err) {
    if (err) {
        console.log(err);
        req.flash('error', err.message);
        res.redirect('/login')
    }
});

/////////////handle logout/////////////
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'Logged You out');
    res.redirect('/');
});

// handle contact forms
router.post('/contact', (req, res) => {
    if (req.body.news_email) {

        const subscribe = `
        <h3>You have a new Subscriber</h3>
        <h3>Subscriber Email: ${req.body.news_email}</h3>
    `;
        const subject = 'New Subscriber';
        const message = 'Email received, Stay tuned';
        contact.logic(subscribe, subject, message, req, res);

    } else if (req.body.phone) {

        const output = `
        <p>You have a new message</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <p>${req.body.message}</p>
    `;
        const subject = 'New message';
        const message = 'Message received, You\'ll hear from us soon.';
        contact.logic(output, subject, message, req, res);

    } else if (req.body.photo_name) {

        const photo_shoot = `
        <h3>You have a new Photo Shoot Request</h3>
        <h3>Name: ${req.body.photo_name}</h3>
        <h3>Number: ${req.body.photo_number}</h3>
    `;
        const subject = 'New Photo Shoot request';
        const message = 'Photo Shoot request received';
        contact.logic(photo_shoot, subject, message, req, res);
    }
});

module.exports = router;