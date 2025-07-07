const path = require('path');
const livroDAO = require('../model/livro.dao');
const fs = require('fs');

exports.cadastrarLivro = async function (novo_livro) {
  const caminho = path.join(__dirname, '..', 'imagens');

  const id_livro = await livroDAO.cadastrarLivro(novo_livro);

  if (novo_livro.imagem) {
    const extensao = novo_livro.imagem.name.split('.').pop();
    const nomeArquivo = `${id_livro}.${extensao}`;
    const caminhoCompleto = path.join(caminho, nomeArquivo);

    if (!fs.existsSync(caminho)) {
      fs.mkdirSync(caminho);
    }

    await novo_livro.imagem.mv(caminhoCompleto);
  }

  return true;
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
