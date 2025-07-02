const livroDAO = require('../model/livro.dao');

exports.cadastrarLivro = async function (novo_livro) {
    const caminho = path.join(__dirname, '..', 'imagens/');
    const id_livro = await livroDAO.cadastrarLivro(novo_livro);

    extensao_arquivo = novo_produto.imagem.name.split(".");

    novo_produto.imagem.mv(caminho + id_livro + '.' + extensao_arquivo.pop());

    return true;
}

exports.listarLivros = async function () {
    let livros = await livroDAO.listarLivros();
    return livros;
}


