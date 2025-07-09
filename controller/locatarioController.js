const locatarioDAO = require('../model/locatario.dao');
const emprestimos = require('./emprestimoController').emprestimos || [];

const tiposValidos = ['aluno', 'professor', 'bibliotecario', 'visitante'];

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefone(telefone) {
  return /^\d{10,11}$/.test(telefone);
}

function validarSenha(senha) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/.test(senha);
}

function validarNome(nome) {
  return typeof nome === 'string' && nome.trim().length >= 3 && nome.trim().length <= 100;
}

function validarDataNascimento(data) {
  const d = new Date(data);
  return d instanceof Date && !isNaN(d) && d < new Date();
}

exports.criarLocatario = async function(novo_locatario) {
  const erros = [];

  if (!validarNome(novo_locatario.nome)) erros.push('Nome deve ter entre 3 e 100 caracteres.');
  if (!validarDataNascimento(novo_locatario.data_nascimento)) erros.push('Data de nascimento inválida.');
  if (!validarEmail(novo_locatario.email)) erros.push('Email inválido.');
  if (!validarSenha(novo_locatario.senha)) erros.push('Senha inválida. Deve ter 8-20 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
  if (!validarTelefone(novo_locatario.telefone)) erros.push('Telefone inválido. Deve conter 10 ou 11 dígitos numéricos.');
  if (!tiposValidos.includes((novo_locatario.tipo || '').toLowerCase())) erros.push('Tipo inválido.');

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

exports.verificarLogin = async (email, senha) => await locatarioDAO.verificarLogin(email, senha);
