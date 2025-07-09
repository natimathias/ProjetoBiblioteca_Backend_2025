const locatarioDAO = require('../model/locatario.dao');
const emprestimos = require('./emprestimoController').emprestimos || [];

exports.criarLocatario = async function(novo_locatario) {
    const erros = [];

    if (erros.length > 0) {
        return erros;
    }

    await locatarioDAO.criarLocatario(novo_locatario);
    return [];
};

exports.listarLocatarios = async function () {
    const locatarios = await locatarioDAO.listarLocatarios();
    return locatarios;
};

exports.deixarIndisponivelLocatario = async function(id) {
    await locatarioDAO.deixarIndisponivelLocatario(id);
}

exports.buscarPorId = async function(id) {
    const locatarios = await locatarioDAO.listarLocatarios();
    return locatarios.find(l => l.id == id);
};

exports.temPendencias = async function(id) {
    const locatario = await exports.buscarPorId(id);

    if (!locatario) return true;

    if (locatario.multa && locatario.multa > 0) {
        return true;
    }

    const emprestimosAtivos = emprestimos.filter(e =>
        e.id_locatario == id && e.status === 'ativo' && new Date() > new Date(e.dataPrevistaDevolucao)
    );

    return emprestimosAtivos.length > 0;
};
