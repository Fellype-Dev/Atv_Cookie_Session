const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFilePath = path.join(__dirname, '..', 'Dados', 'user.json');

router.post('/', (req, res) => {
    const { usuario, senha } = req.body; 

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao ler o arquivo de usuários.');
        }

        let usuarios = [];
        try {
            usuarios = JSON.parse(data); 
        } catch (parseErr) {
            console.error('Erro ao parsear o JSON:', parseErr);
            return res.status(500).send('Erro ao processar os dados de usuários.');
        }

        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

        if (usuarioEncontrado) {
            res.send('Login bem-sucedido!'); 
        } else {
            res.status(401).send('Usuário ou senha inválidos.'); 
        }
    });
});

module.exports = router;
