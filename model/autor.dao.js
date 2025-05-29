const db = require('../config/database');

exports.criarAutor = async function (novo_autor) {
    const resposta = await db.query(
        'INSERT INTO AUTORES (nome) VALUES ($1)',
        [novo_autor.nome], true
    );
    return;
}

exports.removerAutor = async function (id) {
    const resultado = await db.query(`DELETE FROM AUTORES WHERE id = ${id}`);
    return true;
}

exports.listarAutores = async function () {
    const autores = await db.query('SELECT nome FROM AUTORES');
    return autores.rows;
}