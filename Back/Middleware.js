const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use('/register', (req, res, next) => {
    console.log('Usuario cadastrado');
    next();
});

app.use('/login', (req, res, next) => {
    console.log('Usuario logado');
    next();
});

