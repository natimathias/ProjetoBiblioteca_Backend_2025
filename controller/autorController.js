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

exports.deixarIndisponivelAutor = async function(id) {
    await autorDAO.deixarIndisponivelAutor(id);
}

