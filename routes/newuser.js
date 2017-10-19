var express = require('express');
var router = express.Router();

/* GET new user page. */
router.get('/', function (req, res, next) {
    res.render('newuser', {title: 'Novo Usuário'});
});

module.exports = router;
