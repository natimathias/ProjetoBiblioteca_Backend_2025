const livroDAO = require('../model/livro.dao');

exports.cadastrarLivro = async function (novo_livro) {
  return await livroDAO.cadastrarLivro(novo_livro);
};

exports.listarLivros = async function () {
  return await livroDAO.listarLivros();
};

exports.buscarPorId = async function (id) {
  return await livroDAO.buscarPorId(id);
};

exports.reduzirQuantidade = async function (id) {
  return await livroDAO.reduzirQuantidade(id);
};
