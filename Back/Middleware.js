const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session
    ({
        secret: '123',
        resave: true,
        saveUninitialized: true
    }));

app.use('/register', (req, res, next) => {
    console.log('Usuario cadastrado');
    next();
});

app.use('/login', (req, res, next) => {
    console.log('Usuario logado');
    next();
});
