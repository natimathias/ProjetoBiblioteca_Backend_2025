const db = require('../config/database');

exports.criarCategoria = async function(nova_categoria) {
    const resposta = await db.query('INSERT INTO categoria (nome) VALUES ($1)', [nova_categoria.nome], true);
    return;
}

exports.deixarIndisponivelCategoria = async function(id) {
    const resultado = await db.query('UPDATE categoria SET disponivel = false WHERE id = $1', [id]);
    return resultado;
}

exports.listarCategorias = async function() {
  const resultado = await db.query('SELECT * FROM categoria WHERE disponivel = true ORDER BY nome');
  return resultado.rows;
}

exports.buscarPorId = async function (id) {
    const resultado = await db.query('SELECT * FROM categoria WHERE id = $1 AND disponivel = true', [id]);
    return resultado.rows[0];
};

exports.editarCategoria = async function (categoria) {
    return await db.query('UPDATE categoria SET nome = $1 WHERE id = $2', [categoria.nome, categoria.id]);
};
