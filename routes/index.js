let express = require('express');
let router = express.Router();
let Picture = require('../models/picture');
let methodOverride = require('method-override');
let middleware = require('../middleware');

console.log('routes picture');
router.use(methodOverride("_method"));


// //CREATE - add new picture to database
router.post("/new", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to picture array
    let image = req.body.image;
    let author_name = req.body.author_name;
    let author_image = req.body.author_image;
    let newPicture = {
        image: image,
        author_name: author_name,
        author_image: author_image,
        created: new Date().toDateString(),
    };
    // console.log(req.user);
    //create a new picture and save to database
    Picture.create(newPicture, function (err, newlyCreated) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not create Picture');
            res.redirect('/');
        } else {
            //redirect back to pictures page
            console.log(newlyCreated);
            req.flash('success', 'Picture created successfully');
            res.redirect("/blog");
        }
    });
});


// // //SHOW - shows more info about one picture
// router.get("/gallery/:id", function (req, res) {
//     //find the picture with provided id
//     Picture.findById(req.params.id).populate('comments').exec(function (err, foundPicture) {
//         if (err) {
//             console.log(err);
//             req.flash('error', 'Wrong Address');
//             res.redirect('/');
//         } else {
//             // res.send(foundPicture);
//             res.render("picture/show",
//                 {
//                     picture: foundPicture
//                 });
//             // console.log(foundPicture);
//             //render show template with that picture
//         }
//     });
//     //and then render show template with that picture
// });

//EDIT ROUTE
router.get('/gallery/:id/edit', middleware.isLoggedIn, function (req, res) {
    // res.send('welcome');
    //is user logged in
    Picture.findById(req.params.id, function (err, foundPicture) {
        if (err) {
            console.log(err);
            req.flash('error', "Picture not found");
            res.redirect('/');
        } else {
            res.render('picture/edit', { picture: foundPicture });
        }
    })
});


//UPDATE CAMPGROUND
router.put('/gallery/:id/edit', middleware.isLoggedIn, function (req, res) {
    Picture.findByIdAndUpdate(req.params.id, req.body.picture, function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not Update Picture');
            res.redirect('/gallery');
        } else {
            // console.log(req.body.picture);
            res.redirect('/gallery');
        }
    });
});


// DESTROY ROUTE
router.delete("/gallery/:id", middleware.isLoggedIn, function (req, res) {
    Picture.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not remove Picture');
            res.redirect('/gallery');
        } else {
            req.flash('success', 'Picture deleted successfully');
            res.redirect('/gallery');
        }
    });
});


/* GET home page. */
router.get('/', (req, res) => {
    res.render('home');
});

/* GET package page. */
router.get('/package', (req, res) => {
    res.render('package');
});

// GET blog page
// router.get('/blog', (req, res) => {
//     Picture.find({}, function (err, picture) {
//         if (err) {
//             console.log(err);
//             req.flash('error', 'Sorry, No Pictures Found');
//             res.redirect('/');
//         } else {
//             // console.log(picture);
//             res.render("blog",
//                 {
//                     picture: picture
//                 });
//         }
//     })
// });

// GET contact page
router.get('/contact', (req, res) => {
    res.render('contact');
});


// GET gallery page
router.get('/gallery', (req, res) => {
    Picture.find({}, function (err, picture) {
        if (err) {
            console.log(err);
            req.flash('error', 'Sorry, No Pictures Found');
            res.redirect('/');
        } else {
            // console.log(picture);
            res.render("gallery",
                {
                    picture: picture
                });
        }
    })
});

// GET new picture page
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('picture/new');
});

// GET test page
router.get('/test', (req, res) => {
    res.render('test');
});

module.exports = router;