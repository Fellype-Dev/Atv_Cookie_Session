const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'Dados', 'user.json');

function createUser(usuario, senha) {
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    } catch (error) {
        users = [];
    }
    
    const userExists = users.some(user => user.usuario === usuario);
    if (userExists) {
        throw new Error('Usuário já existe');
    }

    users.push({ usuario, senha });

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

function loginUser(usuario, senha) {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users.some(user => user.usuario === usuario && user.senha === senha);
}

module.exports = { createUser, loginUser };
