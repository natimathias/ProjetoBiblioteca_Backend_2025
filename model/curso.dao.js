const db = require('../config/database');

exports.criarCurso = async function(novo_curso) {
    const resposta = await db.query(
        'INSERT INTO cursos (nome, codigo) VALUES ($1, $2)',
        [novo_curso.nome, novo_curso.codigo], true
    );
    return;
}

exports.removerCurso = async function(id) {
    const resultado = await db.query(`DELETE FROM cursos WHERE id = $1`, [id]);
    return resultado;
}

exports.listarCursos = async function() {
    const cursos = await db.query('SELECT nome FROM cursos');
    return cursos.rows;
}