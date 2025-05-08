class Emprestimos {
    constructor(id_locatario, id_livro, data_emprestimo, data_devolucao, status) {
        this.id_locatario = id_locatario;
        this.id_livro = id_livro;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
        this.status = status;
    }
}

module.exports = Emprestimos;