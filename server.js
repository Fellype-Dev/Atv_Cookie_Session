const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const { authMiddleware, setupMiddleware } = require('./Back/Middleware');
const { createUser, loginUser } = require('./Controlador/servicos');

const app = express();

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'Front')));

setupMiddleware(app);
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const { usuario, senha } = req.body;
    if (loginUser(usuario, senha)) {
        req.session.loggedIn = true;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Credenciais inválidas' });
    }
});

app.post('/register', (req, res) => {
    const { usuario, senha } = req.body;
    try {
        createUser(usuario, senha);
        res.json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        if (error.message === "Usuário já existe") {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erro ao criar usuário." });
        }
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ success: false, message: 'Erro ao deslogar.' });
        }
        res.json({ success: true });
    });
});

app.get('/home', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'Front', 'Html', 'Home.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Front', 'Html', 'Login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'Front', 'Html', 'Register.html'));
});

app.listen(3000, () => {
    console.log('Servidor rodando em 3000');
});
