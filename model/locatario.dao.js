const db = require('../config/database');
const md5 = require('md5');

exports.criarLocatario = async function (novo_locatario) {
    await db.query(
        'INSERT INTO locatario (nome, data_nascimento, email, senha, telefone, tipo) VALUES ($1, $2, $3, $4, $5, $6)',
        [novo_locatario.nome, novo_locatario.data_nascimento, novo_locatario.email, md5(novo_locatario.senha), novo_locatario.telefone, novo_locatario.tipo]
    );
};

exports.deixarIndisponivelLocatario = async function (id) {
    return await db.query('UPDATE locatario SET disponivel = false WHERE id = $1', [id]);
};

exports.listarLocatarios = async function () {
    const resultado = await db.query('SELECT * FROM locatario WHERE disponivel = true');
    return resultado.rows;
};

exports.verificarLogin = async function (email, senha) {
    const senhaCriptografada = md5(senha);
    const resultado = await db.query(
        'SELECT * FROM locatario WHERE email = $1 AND senha = $2 AND disponivel = true',
        [email, senhaCriptografada]
    );
    return resultado.rows;
};

exports.buscarPorId = async function (id) {
    const resultado = await db.query('SELECT * FROM locatario WHERE id = $1 AND disponivel = true', [id]);
    return resultado.rows[0];
};

exports.editarLocatario = async function (locatario) {
    return await db.query('UPDATE locatario SET nome = $1 WHERE id = $2', [locatario.nome, locatario.id]);
};

exports.listarEmprestimosAtivosPorLocatario = async function (id) {
    const resultado = await db.query(`
        SELECT l.titulo, l.autor, e.data_emprestimo
        FROM emprestimo e
        JOIN livro l ON l.id = e.id_livro
        WHERE e.id_locatario = $1 AND e.status = 'ativo'
    `, [id]);
    return resultado.rows;
};

exports.listarHistoricoDevolucoesPorLocatario = async function (id) {
    const resultado = await db.query(`
        SELECT l.titulo, l.autor, e.data_devolucao
        FROM emprestimo e
        JOIN livro l ON l.id = e.id_livro
        WHERE e.id_locatario = $1 AND e.status = 'finalizado'
    `, [id]);
    return resultado.rows;
};
