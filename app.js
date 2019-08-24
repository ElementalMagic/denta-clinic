var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var compression = require('compression');
var fs = require('fs');
var app = express();
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('*', function (req, res, next) {
    if (req.path.endsWith('.html')) {
        res.status(404).redirect('https://mcdenta.ru');
    } else {
        next();
    }
});

app.use(express.static(path.resolve('client')));
app.use('/', (req, res, next) => {
    if (req.path != "/") {
        next();
    }
    res.status(200).sendFile(path.resolve('../leader/index.html'));
});

app.use('*', (req, res) => {
    res.status(404).redirect('https://mcdenta.ru');
});

module.exports = app;
