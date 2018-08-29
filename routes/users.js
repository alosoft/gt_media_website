var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var nodemailer = require('nodemailer');
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
    var newUser = new User({ username: req.body.username });
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
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alosoftinc@gmail.com',
                pass: '@Allo2020'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"God\'s Time Media Website" <alosoftinc@gmial.com', // sender address
            to: 'raymondadutwum@gmail.com, isaacbaah.bi@gmail.com', // list of receivers
            subject: 'New Subscriber', // Subject line
            html: subscribe // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        req.flash('success', 'Email received, stay tuned');
        res.redirect('/');

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

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alosoftinc@gmail.com',
                pass: '@Allo2020'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"God\'s Time Media Website" <alosoftinc@gmial.com', // sender address
            to: 'raymondadutwum@gmail.com, isaacbaah.bi@gmail.com', // list of receivers
            subject: 'New Message', // Subject line
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        req.flash('success', 'Message received, You\'ll hear form us soon.');
        res.redirect('/');
    } else if (req.body.photo_name) {

        const photo_shoot = `
        <h3>You have a new Photo Shoot Request</h3>
        <h3>Name: ${req.body.photo_name}</h3>
        <h3>Number: ${req.body.photo_number}</h3>
    `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alosoftinc@gmail.com',
                pass: '@Allo2020'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"God\'s Time Media Website" <alosoftinc@gmial.com', // sender address
            to: 'raymondadutwum@gmail.com, isaacbaah.bi@gmail.com', // list of receivers
            subject: 'New Photo Shoot Request', // Subject line
            html: photo_shoot // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        req.flash('success', 'Photo Shoot request received, stay tuned');
        res.redirect('/');

    }
});

module.exports = router;