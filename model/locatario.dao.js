const db = require('../config/database');
const md5 = require('md5');

exports.criarLocatario = async function (novo_locatario) {
    await db.query(
        'INSERT INTO locatario (nome, data_nascimento, email, senha, telefone, tipo) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            novo_locatario.nome,
            novo_locatario.data_nascimento,
            novo_locatario.email,
            md5(novo_locatario.senha),
            novo_locatario.telefone,
            novo_locatario.tipo
        ]
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

exports.buscarDadosCompletos = async function (id) {
    const dados = {};
    
    const locatario = await db.query(
        'SELECT nome, email, tipo FROM locatario WHERE id = $1 AND disponivel = true',
        [id]
    );

    if (locatario.rowCount === 0) {
        return null; 
    }

    dados.pessoal = locatario.rows[0];

    const emprestados = await db.query(`
        SELECT l.titulo, a.nome AS autor, e.data_emprestimo
        FROM emprestimo e
        JOIN livro l ON e.id_livro = l.id
        JOIN autores a ON l.id_autores = a.id
        WHERE e.id_locatario = $1 AND e.status = 'ativo'
    `, [id]);

    dados.livrosEmprestados = emprestados.rows;

    const devolvidos = await db.query(`
        SELECT l.titulo, a.nome AS autor, e.data_devolucao
        FROM emprestimo e
        JOIN livro l ON e.id_livro = l.id
        JOIN autores a ON l.id_autores = a.id
        WHERE e.id_locatario = $1 AND e.status = 'finalizado'
    `, [id]);

    dados.historicoDevolucoes = devolvidos.rows;

    return dados;
};
