const cursoDAO = require('../model/curso.dao')

exports.criarCurso = async function(novo_curso) {
    const erros = [];

    if (erros.length > 0) {
        return erros;
    }

    await cursoDAO.criarCurso(novo_curso);
    return [];
}

exports.listarCursos = async function() {
    let cursos = await cursoDAO.listarCursos();
    return cursos;
}

exports.removerCurso = async function(id) {
    await cursoDAO.removerCurso(id);
}

