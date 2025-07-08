const db = require('../config/database');

exports.cadastrarLivro = async function (novo_livro) {
  const resposta = await db.query(
    `INSERT INTO livros (titulo, qt_disponivel, isbn, id_autores, edicao, id_editora, caminho_imagens) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, [novo_livro.titulo, novo_livro.qt_disponivel, novo_livro.isbn, novo_livro.id_autores, novo_livro.id_editora, novo_livro.edicao, novo_livro.caminho_imagens]
  );

  return resposta.rows[0].id_livro;
};

exports.listarLivros = async function () {
  const livros = await db.query('SELECT * FROM livros');
  return livros.rows;
};
