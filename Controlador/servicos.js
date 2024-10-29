const fs = require('fs');

function create(array, usuario, senha){
    array.push({
        "usuario":usuario,
        "senha":senha
    },);
    update("user.json", lista_de_usuarios);
}

function update(file, array){
    save(file);
    read(array, file);
}

function read(array, file){
    return array = JSON.parse(fs.readFileSync(file));
}

function save(file){
    fs.writeFileSync(file, JSON.stringify(lista_de_usuarios));
}

function login(usuario, senha){
    let array = read("user.json");
    let user = array.find(user => user.usuario == usuario);

    module.exports = {
        create,
        update,
        read,
        save
    };