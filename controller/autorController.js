const autorDAO = require('../model/autor.dao');

exports.criarAutor = async function(novo_autor) {
    const erros = [];

    if (erros.length > 0) {
        return erros;
    }

    await autorDAO.criarAutor(novo_autor);
    return [];
}

exports.listarAutores = async function() {
    let autores = await autorDAO.listarAutores();
    return autores;
}

exports.removerAutor = async function(autor) {
    await autorDAO.removerAutor(autor.id);
}

