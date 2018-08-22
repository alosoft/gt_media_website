var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

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
    if (err){
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


module.exports = router;