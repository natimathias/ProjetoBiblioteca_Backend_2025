const express = require('express');
const app = express();
const port = 8086;
const bodyParser = require('body-parser');
const Locatario = require('./entidades/locatario');
const Livro = require('./entidades/livro');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', function(req, res){
    // console.log('Funcionando!')

})

app.get('/cadastroLocatario', function(req, res) {
    res.render('CadastroLocatario');
})

app.post('/cadastroLocatario', function (req, res) {
    const novo_locatario = new Locatario(req.body.id, req.body.nome, req.body.dataNascimento, req.body.email, req.body.senha, req.body.telefone, req.body.tipo);

    const resultado = locatarioController.criarLocatario(novo_locatario);
    resultado.then(resp => {
        if(resp.length > 0) {
            res.render('cadastroUsuario', { locatario: novo_locatario, mensagem: resp});
        } else {
            email(novo_locatario.email, 'Cadastro no sistema', 'Seu cadastro foi realizado com sucesso!');
            res.redirect('/login');
        }
    })
})

app.post('/removerLocatario', function (req, res) {
    const resultado = locatarioController.removerLocatario(req.query.id);
    resultado.then(resp => {res.redirect('/CadastroLocatario')});
})

app.get('/cadastroLivro', function(req, res) {
    res.render('CadastroLivro');
})

app.post('/cadastroLivro', function (req, res) {
    const novo_livro = new Livro(req.body.id, req.body.nome, req.body.titulo, req.body.qt_disponivel, req.body.isbn, req.body.id_autores, req.body.edicao, req.body.id_editora, req.body.caminho_imagens);

    const resultado = livroController.criarLivro(novo_livro);
    resultado.then(resp => {
        if(resp.length > 0) {
            res.render('CadastroLivro', {livro: novo_livro, mensagem: resp});
        }
        res.redirect('/catalogo')
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);  
})