const db = require('../config/database');

exports.criarEditora = async function(nova_editora) {
    const resposta = await db.query(`INSERT INTO editora (nome, endereco, telefone) VALUES ($1, $2, $3)`, [nova_editora.nome, nova_editora.endereco, nova_editora.telefone], true );
    return;
}

exports.deixarIndisponivelEditora = async function(id) {
    const resultado = await db.query('UPDATE editora SET disponivel = false WHERE id = $1', [id]);
    return resultado;
}

exports.listarEditoras = async function() {
    const editoras = await db.query(`SELECT * FROM editora`); 
    return editoras.rows;
}

exports.buscarPorId = async function (id) {
    const resultado = await db.query('SELECT * FROM editora WHERE id = $1 AND disponivel = true', [id]);
    return resultado.rows[0];
};

exports.editarEditora = async function (editora) {
    return await db.query('UPDATE editora SET nome = $1 WHERE id = $2', [editora.nome, editora.id]);
};
