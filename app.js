var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var newuser = require('./routes/newuser');
var login = require('./routes/login');
var historia = require('./routes/historia')

var app = express();

var mysql = require('mysql');

///
///	Create connection to MySQL database server.
///
function getMySQLConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'alunoifc',
        database: 'MdA'
    });
}


///
/// HTTP Method	: GET
/// Endpoint 	: /login
///
/// To get collection of person saved in MySQL database.
///
app.get('/users', function (req, res) {
    var personList = [];

    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query('SELECT * FROM users', function (err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500, "status_message": "internal server error"});
        } else {
            // Loop check on each row
            for (var i = 0; i < rows.length; i++) {

                // Create an object to save current row's data
                var person = {
                    'id': rows[i].id,
                    'password': rows[i].password,
                    'name': rows[i].name
                };
                // Add object into array
                personList.push(person);
            }

            // Render index.pug page using array
            res.render('users', {"personList": personList});
        }
    });

    // Close the MySQL connection
    connection.end();

});

///
/// HTTP Method	: GET
/// Endpoint	: /signup
///
/// To get specific data of person based on their identifier.
///
app.get('/users/:id', function (req, res) {
    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query('SELECT * FROM MdA WHERE id = ' + req.params.id, function (err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500, "status_message": "internal server error"});
        } else {
            // Check if the result is found or not
            if (rows.length === 1) {
                // Create the object to save the data.
                var person = {
                    'name': rows[0].name,
                    'address': rows[0].address,
                    'phone': rows[0].phone,
                    'id': rows[0].id
                };
                // render the details.plug page.
                res.render('details', {"person": person});
            } else {
                // render not found page
                res.status(404).json({"status_code": 404, "status_message": "Not found"});
            }
        }
    });

    // Close MySQL connection
    connection.end();
});

///
/// HTTP Method	: GET
/// Endpoint	: /person/:id
///
/// To get specific data of person based on their identifier.
///
app.get('/newuser', function (req, res) {
    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    var email = req.body./*
    // Do the query to get data.
    connection.query('SELECT * FROM MdA WHERE id = ' + req.params.id, function (err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500, "status_message": "internal server error"});
        } else {
            // Check if the result is found or not
            if (rows.length === 1) {
                // Create the object to save the data.
                var person = {
                    'name': rows[0].name,
                    'address': rows[0].address,
                    'phone': rows[0].phone,
                    'id': rows[0].id
                };
                // render the details.plug page.
                res.render('details', {"person": person});
            } else {
                // render not found page
                res.status(404).json({"status_code": 404, "status_message": "Not found"});
            }
        }
    });*/

    // Close MySQL connection
    connection.end();
});

///método POST /historia
app.get('/registrar', function (req, res) {

    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    connection.execute("INSERT INTO users VALUE ("+ req.body.texto+", 'senha', 'ata');");

    // Close the MySQL connection
    connection.end();

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', index);
app.use('/signup', newuser);
app.use('/users', users);
app.use('/login', login);
app.use('/historia', historia)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/users', function (req, res) {

});

module.exports = app;

app.listen(4000, function () {
    console.log('Server started at port 4000');
});
