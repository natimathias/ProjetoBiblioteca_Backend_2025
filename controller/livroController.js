const livroDAO = require('../model/livro.dao');

exports.criarLivro = async function (novo_livro) {
    const erros = [];

    if(erros.length > 0) {
        return erros;
    }

    await livroDAO.criarLivro(novo_livro);
    return [];
}