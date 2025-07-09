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

exports.deixarIndisponivelCurso = async function(id) {
    await cursoDAO.deixarIndisponivelCurso(id);
}

exports.buscarPorId = async function (id) {
    return await cursoDAO.buscarPorId(id);
};

exports.editarCurso = async function (curso) {
    return await cursoDAO.editarCurso(curso);
};