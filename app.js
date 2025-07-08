const express = require('express');
const cors = require('cors');
const multer = require('multer');
const email = require('./config/email');
const app = express();
const port = 8086;
const bodyParser = require('body-parser');
const path = require('path');

const Locatario = require('./entidades/locatario');
const Livro = require('./entidades/livro');
const Autor = require('./entidades/autores');
const Editora = require('./entidades/editora');
const Curso = require('./entidades/cursos');

const livroController = require('./controller/livroController');
const autorController = require('./controller/autorController');
const locatarioController = require('./controller/locatarioController');
const editoraController = require('./controller/editoraController');
const cursoController = require('./controller/cursoController');
const emprestimoController = require('./controller/emprestimoController');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'imagens'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

//Rotas Autor
app.get('/listarAutores', async function (req, res) {
    console.log('Funciona')
    const autores = await autorController.listarAutores();
    res.json(autores);
    return;
});

app.post('/cadastrarAutor', async function (req, res) {
    const novo_autor = new Autor(null, req.body.nome);
    await autorController.criarAutor(novo_autor);
    res.status(201).json({ 'message': 'Autor criado com sucesso!' });
    return;
});

app.get('/removerAutor/:id', function (req, res) {
    console.log(req.params.id);
    const resultado = autorController.removerAutor(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Autor removido com sucesso!' }));
});

//Rotas Editora
app.get('/listarEditoras', async function (req, res) {
    console.log('Funciona')
    const editoras = await editoraController.listarEditoras();
    res.json(editoras);
    return;
});

app.post('/cadastrarEditora', async function (req, res) {
    const nova_editora = new Editora(req.body.id, req.body.nome, req.body.endereco, req.body.telefone);
    await editoraController.criarEditora(nova_editora);
    res.status(201).json({ 'message': 'Editora criada com sucesso!' });
    return;
});

app.get('/removerEditora/:id', function (req, res) {
    console.log(req.params.id);
    const resultado = editoraController.removerEditora(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Editora removida com sucesso!' }));
});

//Rotas Locatario
app.get('/listarLocatarios', function (req, res) {
    console.log('Funciona')
    const locatarios = locatarioController.listarLocatarios();
    res.json(locatarios);
    return;
})

app.post('/cadastrarLocatario', function (req, res) {
    console.log("Dados recebidos:", req.body);
    const novo_locatario = new Locatario(req.body.id, req.body.nome, req.body.dataNascimento, req.body.email, req.body.senha, req.body.telefone, req.body.tipo);

    const resultado = locatarioController.criarLocatario(novo_locatario);
    resultado.then(resp => {
        if (resp.length > 0) {
            res.render('cadastroUsuario', { locatario: novo_locatario, mensagem: resp });
        } else {
            email(novo_locatario.email, 'Cadastro no sistema', 'Seu cadastro foi realizado com sucesso!');
            res.redirect('/login');
        }
    })
})

app.get('/removerLocatario/:id', function (req, res) {
    console.log(req.params.id);
    const resultado = locatarioController.removerLocatario(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Locatário removido com sucesso!' }));
});

// //Rotas Livros
app.get('/listarLivros', async function(req, res) {
    console.log('Funcionou')
    const livros = await livroController.listarLivros();
    res.json(livros);
    return;
});

app.post('/cadastrarLivro', upload.single('capa'), async (req, res) => {
  try {
    const { titulo, qt_disponivel, isbn, autor, editora, edicao } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Selecione uma capa para o livro.' });
    }

    const novoLivro = {
      titulo,
      qt_disponivel: Number(qt_disponivel),
      isbn,
      id_autores: Number(autor),
      edicao,
      id_editora: Number(editora),
      caminho_imagens: req.file.filename,
    };

    await livroController.cadastrarLivro(novoLivro);

    res.status(201).json({ message: 'Livro cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    res.status(500).json({ message: 'Erro ao cadastrar livro.' });
  }
});

// app.post('/removerLivro', function (req, res) {})

app.post('/emprestarLivro', async function(req, res) {
  const { id_locatario, id_livro } = req.body;

  if (!id_locatario || !id_livro) {
    return res.status(400).json({ erro: "Dados incompletos para empréstimo." });
  }

  const resultado = await emprestimoController.realizarEmprestimo({ id_locatario, id_livro });

  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  return res.status(201).json({ mensagem: resultado.mensagem });
});


//Rotas cursos
app.get('/listarCursos', async function (req, res) {
    console.log('Funciona')
    const cursos = await cursoController.listarCursos();
    res.json(cursos);
    return;
});

app.post('/cadastrarCurso', async function (req, res) {
    const novo_curso = new Curso(null, req.body.nome, req.body.codigo);
    await cursoController.criarCurso(novo_curso);
    res.status(201).json({ 'message': 'Curso criada com sucesso' });
    return;
});

app.get('/removerCurso/:id', function (req, res) {
    console.log(req.params.id);
    const resultado = cursoController.removerCurso(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Curso removido com sucesso!' }));
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
})