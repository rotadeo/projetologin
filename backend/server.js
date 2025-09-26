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
const SECRET_KEY = "12345678910";

// local onde está o arquivo do seu banco de dados
const localDados = path.join(__dirname,"data/usuarios.json");

// função para ler os dados do arquivo
const consultarUsuarios=()=>{
    const data = fs.readFileSync(localDados,"utf-8");
    return JSON.parse(data);
}

// função para gravar dados no arquivo
const salvarUsuarios=(users)=>{
    fs.writeFileSync(localDados,JSON.stringify(users,null,2))
}

// rota para registrar usuario
app.post("/register", async(req,res)=>{
    const {email,senha} = req.body;

    if(!email || !senha){
        return res.status(400).json({message:"Campos obrigatórios"})
    }
    const users = consultarUsuarios();
    if(users.find(user=>user.email==email)){
        return res.status(400).json({message:"Email já cadastrado no banco de dados"})
    }
    // criptografar a senha
    const hashSenha = await bcrypt.hash(senha,10) // quantidade de tentaivas (10)
    const novoUsuario = {id:Date.now(),email, senha:hashSenha};
    users.push(novoUsuario);
    salvarUsuarios(users);
    res.status(200).json({message:"Usuario registrado com sucesso"})
})

// rota do login
app.post("/login", async (req,res)=>{
    const {email, senha}= req.body;
    const users = consultarUsuarios();
    const user = users.find(user=>user.email === email);

    if(!user){
        return res.status(400).json({message: "Usuario/senha inválidos"})
    }
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if(!senhaValida){
        return res.status(400).json({message: "Senha inválida"})
    }
    const token = jwt.sign({id:user.id,email:user.email},SECRET_KEY,{expiresIn:"10m"});
    res.json({message:"Login realizado com sucesso",token})
})

// midleware que vai proteger as rotas da api e grantir que apenas usuarios com token valido possam acessar
const autenticaToken = (req,res,next)=>{
    const auth = req.headers["authorization"];
    const token = auth && auth.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token,SECRET_KEY,(erro, user)=>{
        if(erro) return res.sendStatus(403)
        req.user = user;
        next();
    })
}

// rota do dashboard
app.get("/dashboard", autenticaToken, (req,res)=>{
    res.json({message:"Acesso autorizado, Bem-vindo", user:req.user})
})


// executando o servidor na porta definida
app.listen(port,()=>{
    console.log(`servidor rodando http://localhost:${port}`)
})