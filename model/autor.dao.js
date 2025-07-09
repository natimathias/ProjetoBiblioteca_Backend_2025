const db = require('../config/database');

exports.criarAutor = async function (novo_autor) {
    const resposta = await db.query('INSERT INTO autores (nome) VALUES ($1)', [novo_autor.nome], true);
    return;
}

exports.deixarIndisponivelAutor = async function (id) {
    const livros = await db.query("SELECT * FROM livros WHERE id_autores = $1", [id]);

    if (livros.rows.length > 0) {
        throw new Error("Este autor possui livros cadastrados e não pode ser excluído.");
    }

    const resultado = await db.query('UPDATE autores SET disponivel = false WHERE id = $1', [id]);
    return resultado;

}

exports.listarAutores = async function () {
    const autores = await db.query('SELECT * FROM autores');
    return autores.rows;
}

exports.buscarPorId = async function (id) {
    const resultado = await db.query('SELECT * FROM autores WHERE id = $1 AND disponivel = true', [id]);
    return resultado.rows[0];
};

exports.editarAutor = async function (autor) {
    return await db.query('UPDATE autores SET nome = $1 WHERE id = $2', [autor.nome, autor.id]);
};
