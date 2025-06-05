const editoraDAO = require('../model/editora.dao');

exports.criarEditora = async function(novo_editora) {
    const erros = [];

    if(erros.length > 0) {
        return erros;
    }

    await editoraDAO.criarEditora(novo_editora);
    return [];
}

exports.listarEditoras = async function() {
    let editora = await editoraDAO.listarEditora();
    return editora;
}

exports.removerEditora = async function(id) {
    await editoraDAO.removerEditora(id);
}