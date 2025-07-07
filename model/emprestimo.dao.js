const db = require('../config/database');

exports.listarEmprestimosAtivosPorLocatario = async function (id_locatario) {
  const query = `
    SELECT * FROM emprestimos 
    WHERE id_locatario = $1 AND status = 'ativo'
  `;
  const result = await db.query(query, [id_locatario]);
  return result.rows;
};

exports.criarEmprestimo = async function (emprestimo) {
  const query = `
    INSERT INTO emprestimos (id_locatario, id_livro, data_emprestimo, data_devolucao, status)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `;

  const values = [
    emprestimo.id_locatario,
    emprestimo.id_livro,
    emprestimo.data_emprestimo,
    emprestimo.data_devolucao,
    emprestimo.status,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

exports.atualizarStatusEmprestimo = async function (id_emprestimo, novoStatus) {
  const query = `
    UPDATE emprestimos SET status = $1 WHERE id = $2
  `;
  await db.query(query, [novoStatus, id_emprestimo]);
};

exports.listarEmprestimosPorLocatario = async function (id_locatario) {
  const query = `
    SELECT * FROM emprestimos WHERE id_locatario = $1
  `;
  const result = await db.query(query, [id_locatario]);
  return result.rows;
};

exports.buscarPorId = async function (id_emprestimo) {
  const query = `
    SELECT * FROM emprestimos WHERE id = $1
  `;
  const result = await db.query(query, [id_emprestimo]);
  return result.rows[0];
};
