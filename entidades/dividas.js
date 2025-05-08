class Dividas {
    constructor(id_locatario, id_livro, data_divida, multa, status) {
        this.id_locatario = id_locatario;
        this.id_livro = id_livro;
        this.data_divida = data_divida;
        this.multa = multa;
        this.status = status;
    }
}

module.exports = Dividas;