const db = require('../config/database');

exports.criarSubCategoria = async function(nova_subcategoria) {
    const resposta = await db.query('INSERT INTO subcategoria (nome) VALUES ($1)', [nova_subcategoria.nome], true);
    return;
}

exports.deixarIndisponivelSubCategoria = async function(id) {
    const resultado = await db.query('UPDATE subcategoria SET disponivel = false WHERE id = $1', [id]);
    return resultado;
}

exports.listarSubCategorias = async function() {
  const resultado = await db.query('SELECT * FROM subcategoria WHERE disponivel = true ORDER BY nome');
  return resultado.rows;
}
