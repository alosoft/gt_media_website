var nodemailer = require('nodemailer');
let contact = {};

contact.logic = (subscribe, subject, message, req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alosoftinc@gmail.com',
            pass: 'jorblzyacrzrxnea'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"God\'s Time Media Website" <alosoftinc@gmial.com', // sender address
        to: 'raymondadutwum@gmail.com, isaacbaah.bi@gmail.com', // list of receivers
        subject: subject, // Subject line
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
    req.flash('success', message);
    res.redirect('/');
};

module.exports = contact;