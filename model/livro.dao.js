const db = require('../config/database');

exports.criarLivro = async function (novo_livro) {
    const resposta = await db.query(
        'INSERT INTO livro (nome, titulo, qt_disponivel, isbn, id_autores, edicao, id_editora, caminho_imagens) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [novo_livro.nome, novo_livro.tiulo, novo_livro.qt_disponivel, novo_livro.isbn, novo_livro.id_autores, novo_livro.edicao, novo_livro.id_edicao, novo_livro.caminho_imagens], true
    );

    return;
}

exports.listarLivros = async function () {
    const livros = await db.query('SELECT * FROM livros');
    return livros.rows;
}