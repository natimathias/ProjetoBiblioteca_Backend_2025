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

app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

// Autores
app.get('/listarAutores', async (req, res) => {
  const autores = await autorController.listarAutores();
  res.json(autores);
});

app.post('/cadastrarAutor', async (req, res) => {
  const novo_autor = new Autor(null, req.body.nome);
  await autorController.criarAutor(novo_autor);
  res.status(201).json({ message: 'Autor criado com sucesso!' });
});

app.get('/deixarIndisponivelAutor/:id', async (req, res) => {
  await autorController.deixarIndisponivelAutor(req.params.id);
  res.status(201).json({ message: 'Autor marcado como indisponível!' });
});

// Editoras
app.get('/listarEditoras', async (req, res) => {
  const editoras = await editoraController.listarEditoras();
  res.json(editoras);
});

app.post('/cadastrarEditora', async (req, res) => {
  const nova_editora = new Editora(req.body.id, req.body.nome, req.body.endereco, req.body.telefone);
  await editoraController.criarEditora(nova_editora);
  res.status(201).json({ message: 'Editora criada com sucesso!' });
});

app.get('/deixarIndisponivelEditora/:id', async (req, res) => {
  await editoraController.deixarIndisponivelEditora(req.params.id);
  res.status(201).json({ message: 'Editora marcada como indisponível!' });
});

// Locatários
app.get('/listarLocatarios', async (req, res) => {
  const locatarios = await locatarioController.listarLocatarios();
  res.json(locatarios);
});

app.post('/cadastrarLocatario', async (req, res) => {
  console.log("Dados recebidos:", req.body);
  const novo_locatario = new Locatario(
    req.body.id,
    req.body.nome,
    req.body.dataNascimento,
    req.body.email,
    req.body.senha,
    req.body.telefone, 
    req.body.tipo
  );

  const resultado = await locatarioController.criarLocatario(novo_locatario);

  if (resultado.length > 0) {
    res.status(400).json({ mensagem: resultado });
  } else {
    email(novo_locatario.email, 'Cadastro no sistema', 'Seu cadastro foi realizado com sucesso!');
    res.status(201).json({ message: 'Locatário cadastrado com sucesso!' });
  }
});

app.get('/deixarIndisponivelLocatario/:id', async (req, res) => {
  await locatarioController.deixarIndisponivelLocatario(req.params.id);
  res.status(201).json({ message: 'Locatário indisponível!' });
});

// Livros
app.get('/listarLivros', async (req, res) => {
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

// Empréstimos
app.post('/emprestarLivro', async (req, res) => {
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

// Cursos
app.get('/listarCursos', async (req, res) => {
  const cursos = await cursoController.listarCursos();
  res.json(cursos);
});

app.post('/cadastrarCurso', async (req, res) => {
  const novo_curso = new Curso(null, req.body.nome, req.body.codigo);
  await cursoController.criarCurso(novo_curso);
  res.status(201).json({ message: 'Curso criado com sucesso!' });
});

app.get('/deixarIndisponivelCurso/:id', async (req, res) => {
  await cursoController.deixarIndisponivelCurso(req.params.id);
  res.status(201).json({ message: 'Curso marcado como indisponível!' });
});

// Categorias
app.get('/listarCategorias', async (req, res) => {
  const categorias = await categoriaController.listarCategorias();
  res.json(categorias);
});

app.post('/cadastrarCategoria', async (req, res) => {
  const nova_categoria = new Categoria(null, req.body.nome);
  await categoriaController.criarCategoria(nova_categoria);
  res.status(201).json({ message: 'Categoria criada com sucesso!' });
});

app.get('/deixarIndisponivelCategoria/:id', async (req, res) => {
  await categoriaController.deixarIndisponivelCategoria(req.params.id);
  res.status(201).json({ message: 'Categoria marcada como indisponível!' });
});

// Subcategorias
app.get('/listarSubCategorias', async (req, res) => {
  const subcategorias = await subCategoriaController.listarSubCategorias();
  res.json(subcategorias);
});

app.post('/cadastrarSubCategoria', async (req, res) => {
  const nova_subcategoria = new subCategoria(null, req.body.nome);
  await subCategoriaController.criarSubCategoria(nova_subcategoria);
  res.status(201).json({ message: 'SubCategoria criada com sucesso!' });
});

app.get('/deixarIndisponivelSubCategoria/:id', async (req, res) => {
  await subCategoriaController.deixarIndisponivelSubCategoria(req.params.id);
  res.status(201).json({ message: 'SubCategoria marcada como indisponível!' });
});

// Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const resultado = await locatarioController.verificarLogin(email, senha);

    if (resultado.length > 0) {
      res.status(200).json({ message: 'Login realizado com sucesso!' });
    } else {
      res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.get('/pesquisarLivros', (req, res) => {
  console.log("🔍 Rota /pesquisarLivros chamada com termo:", req.query.termo);
  return livroController.pesquisarLivros(req, res);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});
