const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');

app.get('/', (req, res) => {
    res.send('./home.js');
});

app.get('/login', (req, res) => {
    res.send('./login.js');
});

app.get('/register', (req, res) => {
    res.send('./register.js');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

