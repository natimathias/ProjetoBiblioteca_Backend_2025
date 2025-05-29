const autorDAO = require('../model/autor.dao');

const criarAutor = async function (novo_autor) {
    const erros = [];

    if (erros.length > 0) {
        return erros;
    }

    await autorDAO.criarAutor(novo_autor);
    return [];
}

const listarAutores = async function () {
    let autors = await autorDAO.listarAutores();
    return autors;
}

const removerAutor = async function (autor) {
    await autorDAO.removerAutor(autor.id);
}

module.exports = { criarAutor, listarAutores, removerAutor }