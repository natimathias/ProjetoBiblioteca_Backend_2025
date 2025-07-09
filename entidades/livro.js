class Livro {
    constructor(id, titulo, qt_disponivel, isbn, id_autores, id_editora, id_categoria, id_subcategoria, edicao, caminho_imagens, disponivel) {
        this.id = id;
        this.titulo = titulo;
        this.qt_disponivel = qt_disponivel;
        this.isbn = isbn;
        this.id_autores = id_autores;
        this.id_editora = id_editora;
        this.id_categoria = id_categoria;
        this.id_subcategoria = id_subcategoria;
        this.edicao = edicao;
        this.caminho_imagens = caminho_imagens;
        this.disponivel = disponivel;
    }
}

module.exports = Livro;