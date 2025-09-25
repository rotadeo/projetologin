const express = require("express")
const fs = require("fs"); // file system
const path = require("path") // caminho do arquivo do banco de dados
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// criar uma string para renovar a chave de autenticação
const SECRECT_KEY = "";

// executando o servidor na porta definida
app.listen(port,()=>{
    console.log(`servidor rodando http://localhost:${port}`)
})