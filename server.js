const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const registerRoutes = require('./Back/register');
app.use('/register', registerRoutes); 

const loginRoutes = require('./Back/login'); 
app.use('/login', loginRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Front', 'Html', 'Home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Front', 'Html', 'Login.html'));
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
