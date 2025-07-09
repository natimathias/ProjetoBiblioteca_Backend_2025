const db = require('../config/database');

exports.cadastrarLivro = async function (novo_livro) {
  const resposta = await db.query(
    `INSERT INTO livros (titulo, qt_disponivel, isbn, id_autores, id_editora, id_categoria, id_subcategoria, edicao, caminho_imagens, disponivel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
    [novo_livro.titulo, novo_livro.qt_disponivel, novo_livro.isbn, novo_livro.id_autores, novo_livro.id_editora, novo_livro.id_categoria, novo_livro.id_subcategoria, novo_livro.edicao, novo_livro.caminho_imagens, true ]
  );
  return resposta.rows[0].id;
};

exports.listarLivros = async function () {
  const query = `
    SELECT 
      livros.*,
      autores.nome AS autor_nome,
      editora.nome AS editora_nome,
      categoria.nome AS categoria_nome
    FROM livros
    JOIN autores ON livros.id_autores = autores.id
    JOIN editora ON livros.id_editora = editora.id
    JOIN categoria ON livros.id_categoria = categoria.id
    WHERE livros.disponivel = true
  `;
  
  const resultado = await db.query(query);
  return resultado.rows;
};

exports.pesquisarLivros = async function (termo) {

  const query = `
    SELECT livros.*, autores.nome AS autor_nome, editora.nome AS editora_nome
    FROM livros
    JOIN autores ON livros.id_autores = autores.id
    JOIN editora ON livros.id_editora = editora.id
    WHERE livros.disponivel = true
    AND (
      LOWER(livros.titulo) LIKE LOWER($1)
      OR LOWER(autores.nome) LIKE LOWER($1)
      OR LOWER(editora.nome) LIKE LOWER($1)
      OR CAST(livros.isbn AS TEXT) LIKE $1
    )`;

  const valores = [`%${termo}%`];

  const resultado = await db.query(query, valores);
  return resultado.rows;
};

exports.indisponibilizarLivro = async function (id) {
  return await db.query('UPDATE livros SET disponivel = false WHERE id = $1', [id]);
};

exports.buscarPorId = async function (id) {
    const resultado = await db.query('SELECT * FROM livros WHERE id = $1 AND disponivel = true', [id]);
    return resultado.rows[0];
};

exports.editarLivro = async function (livro) {
    return await db.query('UPDATE livros SET nome = $1 WHERE id = $2', [livro.nome, livro.id]);
};
