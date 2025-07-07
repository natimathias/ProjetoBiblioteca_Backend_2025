const db = require('../config/database');

exports.cadastrarLivro = async function (novo_livro) {

    const extensao_arquivo = novo_produto.imagem.name.split(".").pop();

exports.cadastrarLivro = async function (novo_livro) {

    const extensao_arquivo = novo_produto.imagem.name.split(".").pop();

    const resposta = await db.query(
        'INSERT INTO livros (titulo, qt_disponivel, isbn, id_autores, edicao, id_editora, caminho_imagens) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id_livro',
        [novo_livro.titulo, novo_livro.qt_disponivel, novo_livro.isbn, novo_livro.id_autores, novo_livro.edicao, novo_livro.id_edicao, novo_livro.caminho_imagens, extensao_arquivo]
    );

    return resposta.rows[0].id_livro;
    return resposta.rows[0].id_livro;
}

exports.listarLivros = async function () {
    const livros = await db.query('SELECT * FROM livros');
    return livros.rows;
}