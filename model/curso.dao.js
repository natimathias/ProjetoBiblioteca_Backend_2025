const db = require('../config/database');

exports.criarCurso = async function(novo_curso) {
    const resposta = await db.query(
        'INSERT INTO cursos (nome, codigo) VALUES ($1, $2)',
        [novo_curso.nome, novo_curso.codigo], true
    );
    return;
}

exports.deixarIndisponivelCurso = async function(id) {
    const resultado = await db.query('UPDATE cursos SET disponivel = false WHERE id = $1', [id]);
    return resultado;
}

exports.listarCursos = async function() {
    const cursos = await db.query('SELECT * FROM cursos');
    return cursos.rows;
}

exports.buscarPorId = async function (id) {
    const resultado = await db.query('SELECT * FROM curso WHERE id = $1 AND disponivel = true', [id]);
    return resultado.rows[0];
};

exports.editarCurso = async function (curso) {
    return await db.query('UPDATE curso SET nome = $1 WHERE id = $2', [curso.nome, curso.id]);
};