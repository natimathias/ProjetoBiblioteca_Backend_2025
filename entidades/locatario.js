class Locatario {
    constructor(id, nome, dataNascimento, email, senha, telefone, tipo) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.tipo = tipo;
    }
}

module.exports = Locatario;