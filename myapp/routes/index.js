var express = require('express'),
    router = express.Router(),
    riot = require('riot');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Richard Johnson' });
});

router.get('/index.tag', function(req, res, next) {
  res.render('index', { title: 'Richard Johnson' });
});


riot.mount('index');
riot.mount('webdev');



module.exports = router;
