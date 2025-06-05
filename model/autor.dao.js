const db = require('../config/database');

exports.criarAutor = async function(novo_autor) {
    const resposta = await db.query(
        'INSERT INTO autores (nome) VALUES ($1)',
        [novo_autor.nome], true
    );
    return;
}

exports.removerAutor = async function(id) {
    const resultado = await db.query(`DELETE FROM autores WHERE id = ${id}`);
    return true;
}

exports.listarAutores = async function() {
    const autores = await db.query('SELECT nome FROM autores');
    return autores.rows;
}