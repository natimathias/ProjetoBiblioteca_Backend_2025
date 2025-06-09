const db = require('../config/database');

exports.criarEditora = async function(nova_editora) {
    const resposta = await db.query(`INSERT INTO editora (nome, endereco, telefone) VALUES ($1, $2, $3)`, [nova_editora.nome, nova_editora.endereco, nova_editora.telefone], true );
    return;
}

exports.removerEditora = async function(id) {
    const resultado = await db.query(`DELETE FROM editora WHERE id = ${id}`);
    return true;
}

exports.listarEditoras = async function() {
    const editoras = await db.query(`SELECT * FROM editora`); 
    return editoras.rows;
}
