# 📚 Sistema de Gerenciamento de Biblioteca
Este projeto consiste em uma API backend desenvolvida em Node.js para gerenciar um sistema de biblioteca. O sistema permite controlar *livros, autores, editoras, categorias, subcategorias, empréstimos, locatários, cursos* e *bibliotecário*, além de integrar funcionalidades como envio de e-mails e gerenciamento de dívidas.

## 🚀 Tecnologias Utilizadas
- Node.js
- Express.js
- PostgreSQL
- Sequelize (ou pg, dependendo da implementação do seu `database.js`)
- Nodemailer (para envio de e-mails)
- Dotenv

## 📂 Estrutura de Pastas
```
PROJETOBIBLIOTECA/
│
├── config/                  # Configurações gerais (DB, e-mail)
│   ├── database.js          # Configuração da conexão com banco de dados
│   └── email.js             # Configuração de envio de e-mails
│
├── controller/              # Lógica dos endpoints da API
│   ├── autorController.js
│   ├── categoriaController.js
│   ├── cursoController.js
│   ├── editoraController.js
│   ├── emprestimoController.js
│   ├── livroController.js
│   ├── locatarioController.js
│   └── subcategoriaController.js
│
├── entidades/               # Definições das entidades do sistema
│   ├── autores.js
│   ├── bibliotecario.js
│   ├── categoria.js
│   ├── cursos.js
│   ├── cursos_locatario.js
│   ├── dividas.js
│   ├── editora.js
│   ├── emprestimos.js
│   ├── livro.js
│   ├── locatario.js
│   └── subCategoria.js
│
├── model/                   # DAOs (Data Access Object) para acesso ao banco
│   ├── autor.dao.js
│   ├── categoria.dao.js
│   ├── curso.dao.js
│   ├── editora.dao.js
│   ├── emprestimo.dao.js
│   ├── livro.dao.js
│   ├── locatario.dao.js
│   └── subcategoria.dao.js
│
├── imagens/                 # (Opcional) Imagens ou uploads
│
├── .env                     # Variáveis de ambiente
├── app.js                   # Arquivo principal da aplicação
├── package.json             # Dependências e scripts
└── package-lock.json
```

## 🧠 Funcionalidades
- Cadastro, edição, remoção e listagem de:
  - Autores
  - Categorias e Subcategorias
  - Editoras
  - Livros
  - Locatários e seus Cursos
  - Bibliotecários
- Registro e controle de empréstimos e devoluções
- Controle de dívidas por atraso
- Envio de e-mails para notificações (ex: aviso de devolução)
- Integração com banco de dados relacional (PostgreSQL)

### 📘 Cadastro de Livro
1. O `livroController.js` recebe a requisição da rota.
2. Valida os dados e chama `livro.dao.js` para persistência.
3. O DAO acessa a entidade `livro.js` e salva no banco.

### 📩 Envio de E-mail
1. O `email.js` na pasta `config` contém a configuração SMTP.
2. É chamado por controllers como `emprestimoController.js` para enviar notificações aos locatários.

### ⚙️ Como Executar o Projeto
  ## 1. Clonar o repositório
```bash
git clone https://github.com/natimathias/ProjetoBiblioteca_Backend_2025
```
  ## 2. Instalar dependências
```bash
npm install
```
  ## 3. Configurar variáveis de ambiente
Crie um arquivo `.env` com as seguintes chaves:
```
PORT=3000
DATABASE_URL=postgres://user:password@host:port/dbname
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha
```
  ## 4. Rodar o projeto
```bash
node app.js
```