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
const Categoria = require('./entidades/categoria');
const subCategoria = require('./entidades/subCategoria');

const livroController = require('./controller/livroController');
const autorController = require('./controller/autorController');
const locatarioController = require('./controller/locatarioController');
const editoraController = require('./controller/editoraController');
const cursoController = require('./controller/cursoController');
const emprestimoController = require('./controller/emprestimoController');
const categoriaController = require('./controller/categoriaController');
const subCategoriaController = require('./controller/subcategoriaController');

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

app.get('/deixarIndisponivelAutor/:id', function (req, res) {
    const resultado = autorController.deixarIndisponivelAutor(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Autor marcado como indisponível!' }));
});

//Rotas Editora
app.get('/listarEditoras', async function (req, res) {
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

app.get('/deixarIndisponivelEditora/:id', function (req, res) {
    const resultado = editoraController.deixarIndisponivelEditora(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Editora marcada como indisponível!' }));
});

//Rotas Locatario
app.get('/listarLocatarios', function (req, res) {
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
            res.status(201).json({ 'message': 'Locatário cadastrado com sucesso!' });
        }
    })
})

app.get('/deixarIndisponivelLocatario/:id', function (req, res) {
    const resultado = locatarioController.deixarIndisponivelLocatario(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Locatário indisponível!' }));
});

// //Rotas Livros
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

app.get('/listarLivros', async function(req, res) {
  const livros = await livroController.listarLivros();
  res.json(livros);
});

app.post('/cadastrarLivro', upload.single('capa'), async (req, res) => {
  try {
    const { titulo, qt_disponivel, isbn, autor, editora, edicao, categoria, subcategoria } = req.body;
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
      id_categoria: Number(categoria),
      id_subcategoria: Number(subcategoria),
      caminho_imagens: req.file.filename 
    };

    await livroController.cadastrarLivro(novoLivro);

    res.status(201).json({ message: 'Livro cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    res.status(500).json({ message: 'Erro ao cadastrar livro.' });
  }
});

app.post('/indisponibilizarLivro/:id', async (req, res) => {
  try {
    await livroController.indisponibilizarLivro(req.params.id);
    res.status(200).json({ message: 'Livro marcado como indisponível.' });
  } catch (error) {
    console.error('Erro ao indisponibilizar livro:', error);
    res.status(500).json({ message: 'Erro ao marcar livro como indisponível.' });
  }
});

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
    const cursos = await cursoController.listarCursos();
    res.json(cursos);
    return;
});

app.post('/cadastrarCurso', async function (req, res) {
    const novo_curso = new Curso(null, req.body.nome, req.body.codigo);
    await cursoController.criarCurso(novo_curso);
    res.status(201).json({ 'message': 'Curso criado com sucesso!' });
    return;
});

app.get('/deixarIndisponivelCurso/:id', function (req, res) {
    const resultado = cursoController.deixarIndisponivelCurso(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Curso marcado como indisponível!' }));
});

//Rotas Categoria
app.get('/listarCategorias', async function (req, res) {
    const categorias = await categoriaController.listarCategorias();
    res.json(categorias);
    return;
});

app.post('/cadastrarCategoria', async function (req, res) {
    const nova_categoria = new Categoria(null, req.body.nome);
    await categoriaController.criarCategoria(nova_categoria);
    res.status(201).json({ 'message': 'Categoria criada com sucesso!' });
    return;
});

app.get('/deixarIndisponivelCategoria/:id', function (req, res) {
    const resultado = categoriaController.deixarIndisponivelCategoria(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'Categoria marcada como indisponível!' }));
});

//Rotas subCategoria
app.get('/listarSubCategorias', async function (req, res) {
    const subcategorias = await subCategoriaController.listarSubCategorias();
    res.json(subcategorias);
    return;
});

app.post('/cadastrarSubCategoria', async function (req, res) {
    const nova_subcategoria = new subCategoria(null, req.body.nome);
    await subCategoriaController.criarSubCategoria(nova_subcategoria);
    res.status(201).json({ 'message': 'SubCategoria criada com sucesso!' });
    return;
});

app.get('/deixarIndisponivelSubCategoria/:id', function (req, res) {
    const resultado = subCategoriaController.deixarIndisponivelSubCategoria(req.params.id);
    resultado.then(res.status(201).json({ 'message': 'SubCategoria marcada como indisponível!' }));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
})