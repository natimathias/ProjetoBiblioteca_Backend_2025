const livroDAO = require('../model/livro.dao');

exports.cadastrarLivro = async function (novo_livro) {
  return await livroDAO.cadastrarLivro(novo_livro);
};

exports.listarLivros = async function () {
  return await livroDAO.listarLivros();
};

exports.pesquisarLivros = async function (req, res) {
  const termo = req.query.termo;
    console.log("📥 Termo recebido no controller:", termo);

  if (!termo) {
    return res.status(400).json({ message: "Termo de pesquisa não informado." });
  }

  try {
    const livros = await livroDAO.pesquisarLivros(termo);
    res.status(200).json(livros);
  } catch (error) {
    console.error("Erro no controller ao pesquisar livros:", error);
    res.status(500).json({ message: "Erro ao pesquisar livros." });
  }
};

exports.indisponibilizarLivro = async function (id) {
  return await livroDAO.indisponibilizarLivro(id);
};

exports.buscarPorId = async function (id) {
  return await livroDAO.buscarPorId(id);
};

exports.reduzirQuantidade = async function (id) {
  return await livroDAO.reduzirQuantidade(id);
};
