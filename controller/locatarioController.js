const locatarioDAO = require('../model/locatario.dao');

exports.criarLocatario = async function(novo_locatario) {
    const erros = [];

    if(erros.length > 0) {
        return erros;
    }

    await locatarioDAO.criarLocatario(novo_locatario);

    return [];
}

exports.listarLocatarios = async function () {
    const locatarios = await locatarioDAO.listarLocatarios();
    return locatarios;
}

exports.removerLocatario = async function(id) {
    return await locatarioDAO.removerLocatario(id);
}