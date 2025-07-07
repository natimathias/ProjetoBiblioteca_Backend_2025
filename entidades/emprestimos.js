class Emprestimo {
  constructor(id_locatario, id_livro, data_emprestimo, prazo_dias) {
    this.id_locatario = id_locatario;
    this.id_livro = id_livro;
    this.data_emprestimo = new Date(data_emprestimo);
    this.prazo_dias = prazo_dias;
    this.status = 'ativo';
    this.data_devolucao = null;
  }

  get dataPrevistaDevolucao() {
    const d = new Date(this.data_emprestimo);
    d.setDate(d.getDate() + this.prazo_dias);
    return d;
  }

  estaAtrasado() {
    if (this.status !== 'ativo') return false;
    return new Date() > this.dataPrevistaDevolucao;
  }

  calcularMulta() {
    if (!this.estaAtrasado()) return 0;
    const diasAtraso = Math.ceil((new Date() - this.dataPrevistaDevolucao) / (1000 * 60 * 60 * 24));
    return diasAtraso;
  }
}

module.exports = Emprestimo;
