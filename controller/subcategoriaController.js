const subCategoriaDAO = require('../model/subcategoria.dao');

exports.criarSubCategoria = async function(nova_subcategoria) {
    const erros = [];

    if (erros.length > 0) {
        return erros;
    }

    await subCategoriaDAO.criarSubCategoria(nova_subcategoria);
    return [];
}

exports.listarSubCategorias = async function() {
    let categorias = await subCategoriaDAO.listarSubCategorias();
    return categorias;
}

exports.deixarIndisponivelSubCategoria = async function(id) {
    await subCategoriaDAO.deixarIndisponivelSubCategoria(id);
}

exports.buscarPorId = async function (id) {
    return await subCategoriaDAO.buscarPorId(id);
};

exports.editarSubCategoria = async function (subCategoria) {
    return await subCategoriaDAO.editarSubCategoria(subCategoria);
};

