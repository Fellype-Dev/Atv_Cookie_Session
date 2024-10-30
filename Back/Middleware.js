const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

function authMiddleware(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/');
    }
}

function setupMiddleware(app) {
    app.use(cookieParser());
    app.use(session({
        secret: '123',
        resave: true,
        saveUninitialized: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

module.exports = { authMiddleware, setupMiddleware };
