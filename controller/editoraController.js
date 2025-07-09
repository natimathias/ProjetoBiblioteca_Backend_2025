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
    let editora = await editoraDAO.listarEditoras();
    return editora;
}

exports.deixarIndisponivelEditora = async function(id) {
    await editoraDAO.deixarIndisponivelEditora(id);
}

exports.buscarPorId = async function (id) {
    return await editoraDAO.buscarPorId(id);
};

exports.editarEditora = async function (editora) {
    return await editoraDAO.editarEditora(editora);
};