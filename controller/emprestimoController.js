const Emprestimo = require('../entidades/emprestimos');
const livroController = require('./livroController');
const locatarioController = require('./locatarioController');
const emprestimoDAO = require('../model/emprestimo.dao');

async function realizarEmprestimo({ id_locatario, id_livro }) {
  const locatario = await locatarioController.buscarPorId(id_locatario);
  const livro = await livroController.buscarPorId(id_livro);

  if (!locatario || !livro) return { erro: 'Locatário ou livro não encontrado.' };
  if (livro.qt_disponivel <= 0) return { erro: 'Livro indisponível.' };
  if (await locatarioController.temPendencias(id_locatario)) return { erro: 'Locatário possui pendências.' };

  const emprestimosAtivos = await emprestimoDAO.listarEmprestimosAtivosPorLocatario(id_locatario);
  const limite = locatario.tipo === 'aluno' ? 3 : 5;
  const prazoDias = locatario.tipo === 'aluno' ? 14 : 30;

  if (emprestimosAtivos.length >= limite) return { erro: 'Limite de empréstimos atingido.' };

  const data_emprestimo = new Date();
  const data_devolucao = new Date(data_emprestimo);
  data_devolucao.setDate(data_devolucao.getDate() + prazoDias);

  const novoEmprestimo = new Emprestimo(
    id_locatario,
    id_livro,
    data_emprestimo,
    data_devolucao,
    'ativo'
  );

  const emprestimoSalvo = await emprestimoDAO.criarEmprestimo(novoEmprestimo);

  await livroController.reduzirQuantidade(id_livro);

  return emprestimoSalvo;
}

module.exports = { realizarEmprestimo };
