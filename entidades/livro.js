class Livro {
    constructor(id, nome, titulo, qt_disponivel, isbn, id_autores, edicao, id_editora, caminho_imagens) {
        this.id = id;
        this.titulo = titulo;
        this.qt_disponivel = qt_disponivel;
        this.isbn = isbn;
        this.id_autores = id_autores;
        this.edicao = edicao;
        this.id_editora = id_editora;
        this.caminho_imagens = caminho_imagens;
    }
}

module.exports = Livro;