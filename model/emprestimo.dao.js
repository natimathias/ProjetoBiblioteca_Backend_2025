const db = require('../config/database');

exports.getUsuarioPorId = async (id) => {
  const result = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
  return result.rows[0];
};

exports.contarEmprestimosAtivos = async (id_usuario) => {
  const result = await db.query(`
    SELECT COUNT(*) FROM emprestimo 
    WHERE id_usuario = $1 AND data_devolucao_real IS NULL
  `, [id_usuario]);
  return parseInt(result.rows[0].count);
};

exports.verificarAtrasos = async (id_usuario) => {
  const result = await db.query(`
    SELECT 1 FROM emprestimo 
    WHERE id_usuario = $1 
    AND data_devolucao_real IS NULL 
    AND data_devolucao_prevista < CURRENT_DATE
    LIMIT 1
  `, [id_usuario]);
  return result.rowCount > 0;
};

exports.getLivroPorId = async (id_livro) => {
  const result = await db.query('SELECT * FROM livro WHERE id = $1', [id_livro]);
  return result.rows[0];
};

exports.criarEmprestimo = async (id_usuario, id_livro, dataEmprestimo, dataDevolucaoPrevista) => {
  await db.query(`
    INSERT INTO emprestimo (id_usuario, id_livro, data_emprestimo, data_devolucao_prevista)
    VALUES ($1, $2, $3, $4)
  `, [id_usuario, id_livro, dataEmprestimo, dataDevolucaoPrevista]);
};

exports.diminuirEstoque = async (id_livro) => {
  await db.query('UPDATE livro SET qt_disponivel = qt_disponivel - 1 WHERE id = $1', [id_livro]);
};
