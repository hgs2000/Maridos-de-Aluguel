var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('historia', {title: 'HISTORIA/BRASIL COLONIAL'});
});

module.exports = router;
