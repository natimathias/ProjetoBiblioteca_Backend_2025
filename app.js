const express = require('express');
const app = express();
const port = 8086;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);  
})