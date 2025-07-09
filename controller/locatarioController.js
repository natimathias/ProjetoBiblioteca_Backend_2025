const locatarioDAO = require('../model/locatario.dao');
const emprestimos = require('./emprestimoController').emprestimos || [];

exports.criarLocatario = async function(novo_locatario) {
  const erros = [];

  if (erros.length) return erros;

  await locatarioDAO.criarLocatario(novo_locatario);
  return [];
};

exports.listarLocatarios = async () => await locatarioDAO.listarLocatarios();

exports.deixarIndisponivelLocatario = async (id) => await locatarioDAO.deixarIndisponivelLocatario(id);

exports.buscarPorId = async (id) => {
  const locatarios = await locatarioDAO.listarLocatarios();
  return locatarios.find(l => l.id == id);
};

exports.temPendencias = async (id) => {
  const locatario = await exports.buscarPorId(id);
  if (!locatario) return true;
  if (locatario.multa > 0) return true;

  const atrasados = emprestimos.filter(e =>
    e.id_locatario == id && e.status === 'ativo' && new Date() > new Date(e.dataPrevistaDevolucao)
  );
  return atrasados.length > 0;
};

exports.verificarLogin = async (email, senha) => { 
  await locatarioDAO.verificarLogin(email, senha);
};

exports.buscarPorId = async function (id) {
    return await locatarioDAO.buscarPorId(id);
};

exports.editarLocatario = async function (locatario) {
    return await locatarioDAO.editarLocatario(locatario);
};

