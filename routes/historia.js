var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('historia', {title: 'HISTORIA/BRASIL COLONIAL'});
});

module.exports = router;
