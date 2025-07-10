const emprestimoDAO = require('../dao/emprestimoDAO');

exports.emprestarLivro = async (req, res) => {
  try {
    const { id_usuario, id_livro } = req.body;

    const usuario = await emprestimoDAO.getUsuarioPorId(id_usuario);
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });

    const perfil = usuario.perfil;
    const limite = perfil === 'aluno' ? 3 : 5;

    const qtdEmprestimos = await emprestimoDAO.contarEmprestimosAtivos(id_usuario);
    if (qtdEmprestimos >= limite) {
      return res.status(400).json({ mensagem: `Limite de ${limite} empréstimos para perfil ${perfil}.` });
    }

    const possuiAtrasos = await emprestimoDAO.verificarAtrasos(id_usuario);
    if (possuiAtrasos) {
      return res.status(400).json({ mensagem: 'Usuário com empréstimos em atraso.' });
    }

    const livro = await emprestimoDAO.getLivroPorId(id_livro);
    if (!livro || livro.qt_disponivel < 1) {
      return res.status(400).json({ mensagem: 'Livro indisponível.' });
    }

    // Datas
    const hoje = new Date();
    const devolucaoPrevista = new Date(hoje);
    devolucaoPrevista.setDate(hoje.getDate() + (perfil === 'aluno' ? 14 : 30));

    // Cadastrar empréstimo e atualizar estoque
    await emprestimoDAO.criarEmprestimo(id_usuario, id_livro, hoje, devolucaoPrevista);
    await emprestimoDAO.diminuirEstoque(id_livro);

    res.status(200).json({ mensagem: 'Empréstimo realizado com sucesso.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao processar empréstimo.' });
  }
};
