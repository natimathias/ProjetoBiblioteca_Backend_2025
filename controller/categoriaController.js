const categoriaDAO = require('../model/categoria.dao');

exports.criarCategoria = async function(nova_categoria) {
    const erros = [];

    if (erros.length > 0) {
        return erros;
    }

    await categoriaDAO.criarCategoria(nova_categoria);
    return [];
}

exports.listarCategorias = async function() {
    let categorias = await categoriaDAO.listarCategorias();
    return categorias;
}

exports.deixarIndisponivelCategoria = async function(id) {
    await categoriaDAO.deixarIndisponivelCategoria(id);
}

exports.buscarPorId = async function (id) {
    return await categoriaDAO.buscarPorId(id);
};

exports.editarCategoria = async function (categoria) {
    return await categoriaDAO.editarCategoria(categoria);
};

