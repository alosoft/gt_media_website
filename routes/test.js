// handle contact forms
router.post('/contact', (req, res) => {
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

    // create reuseable transporter object using default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alonsoftinc@gmail.com',
            pass: '@Allo2020'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    // setup email data with unicode symbols
    let mailOption = {
        from: '"God\'s Time Media Website" <alosoftinc@gmail.com', // sender email address
        to: 'raymondadutwum@gmail.com', // list of receivers
        subject: 'New Message', // Subject
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOption, (err, info) => {
        if (err){
            return console.log(error)
        }
        console.log('Message send: %s', info.message);
        console.log('Preview URL: %s', nodemailer.getTestUrl(info));
    })
    req.flash('success', 'Message received, You\'ll hear form us soon.')
    res.redirect('/');
});