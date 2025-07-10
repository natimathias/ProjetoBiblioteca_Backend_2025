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

exports.buscarMeusDados = async function (req, res) {
  const id = req.params.id;

  try {
    const pessoal = await locatarioDAO.buscarPorId(id);
    const livrosEmprestados = await locatarioDAO.listarEmprestimosAtivosPorLocatario(id);
    const historicoDevolucoes = await locatarioDAO.listarHistoricoDevolucoesPorLocatario(id);

    res.status(200).json({
      pessoal,
      livrosEmprestados,
      historicoDevolucoes
    });
  } catch (error) {
    console.error("Erro ao buscar dados do locatário:", error);
    res.status(500).json({ message: "Erro interno ao buscar dados." });
  }
};
