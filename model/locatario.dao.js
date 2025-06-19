const db = require('../config/database');
const md5 = require('md5')

exports.criarLocatario = async function (novo_locatario) {
    const resposta = await db.query(
        'INSERT INTO locatario (nome, data_nascimento, email, senha, telefone, tipo) VALUES ($1, $2, $3, $4, $5, $6)', 
        [novo_locatario.nome, novo_locatario.data_nascimento, novo_locatario.email, md5(novo_locatario.senha), novo_locatario.telefone, novo_locatario.tipo], true
    );
    return;
}

exports.removerLocatario = async function (id) {
    const { rows } = await db.query(`UPDATE locatario SET ativo = false WHERE id = '${id}'`);
    return rows;
}

exports.listarLocatarios = async function () {
    const locatario = await db.query('SELECT * FROM locatario');
    return locatario.rows;
}
