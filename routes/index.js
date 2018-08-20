var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home');
});

/* GET package page. */
router.get('/package', (req, res) => {
  res.render('package');
});

// GET blog page
router.get('/blog', (req, res) => {
  res.render('blog');
});

// GET contact page
router.get('/contact', (req, res) => {
  res.render('contact');
});

// GET gallery page
router.get('/gallery', (req, res) => {
  res.render('gallery');
});

module.exports = router;
