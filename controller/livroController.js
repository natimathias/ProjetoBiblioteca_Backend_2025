const livroDAO = require('../model/livro.dao');

const criarLivro = async function (novo_livro) {
    const erros = [];

    if (erros.length > 0) {
        return erros;
    }

    await livroDAO.criarLivro(novo_livro);
    return [];
}

const listarLivros = async function () {
    let livros = await livroDAO.listarLivros();
    return livros;
}


module.exports = { criarLivro, listarLivros }