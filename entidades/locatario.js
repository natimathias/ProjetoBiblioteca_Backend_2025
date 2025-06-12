class Locatario {
    constructor(id, nome, data_nascimento, email, senha, telefone, tipo) {
        this.id = id;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.tipo = tipo;
    }
}

module.exports = Locatario;