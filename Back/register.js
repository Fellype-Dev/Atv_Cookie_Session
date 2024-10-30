const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const usersFilePath = path.join(__dirname, '..', 'Dados', 'user.json'); 

router.use(express.json()); 

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front/Html/register.html')); 
});

router.post('/', (req, res) => {
    const novo_usuario = req.body;

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

        usuarios.push(novo_usuario);

        fs.writeFile(usersFilePath, JSON.stringify(usuarios, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Erro ao escrever no arquivo:', writeErr);
                return res.status(500).send('Erro ao registrar o usuário.');
            }
            res.send('Usuário registrado com sucesso!');
        });
    });
});

module.exports = router;
