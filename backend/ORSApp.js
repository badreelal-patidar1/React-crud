//Import dependencies 
var express = require('express');
var session = require("express-session")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var multer = require('multer');//Halble multipart form
var cors = require('cors')
//Create express app
var app = express();


//Configure modules
app.use(cors())
app.use(bodyParser.json());//parse json data from request
app.use(bodyParser.urlencoded({ extended: true })); //parse request parameters  
app.use(multer({ dest: __dirname + '/tmp/' }).any());//tempretory folder to store uploaded files
app.use(cookieParser()) //Cookie aprser
//enable cors for allow other origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});
//Set session timeout
app.use(session({
    secret: 'test',
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 1000000, secure: false, httpOnly: false }
}));

//Set static resources folder
// app.use(express.static('./public'));

//Set Routes
app.use('/', require('./router'))


//Start server at 8080 port
var listener = app.listen(8080, "localhost", function () {
    var host = listener.address().address
    var port = listener.address().port
    console.log('listening to http://' + host + ':' + port);
});

