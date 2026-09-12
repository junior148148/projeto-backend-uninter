const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();

app.use(express.json());
const SECRET_KEY = "chave-secreta-uninter-2026";

const ARQUIVO_DB = './pedidos.json';
function lerBanco() {
    if (!fs.existsSync(ARQUIVO_DB)) return [];
    return JSON.parse(fs.readFileSync(ARQUIVO_DB, 'utf8'));
}
function salvarBanco(dados) {
    fs.writeFileSync(ARQUIVO_DB, JSON.stringify(dados, null, 2));
}

// Rota de Login (Gera o Token JWT)[cite: 1]
app.post('/auth/login', (req, res) => {
    const { email, senha } = req.body;
    if (email === "cliente@exemplo.com" && senha === "Senha@123") {
        const token = jwt.sign({ email, perfil: "CLIENTE" }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ accessToken: token, tokenType: "Bearer" });
    }
    res.status(401).json({ error: "CREDENCIAIS_INVALIDAS", message: "E-mail ou senha incorretos." });
});

// Middleware para verificar o Token[cite: 1]
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: "TOKEN_AUSENTE", message: "Token não fornecido." });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "TOKEN_INVALIDO", message: "Acesso negado." });
        req.user = user;
        next();
    });
}

// Rota de Pedidos Protegida por Token[cite: 1]
app.post('/pedidos', verificarToken, (req, res) => {
    const { canalPedido, itens } = req.body;
    if (!canalPedido) {
        return res.status(400).json({ error: "DADO_OBRIGATORIO", message: "O campo canalPedido é obrigatório." });
    }
    const pedidos = lerBanco();
    const novoPedido = {
        idPedido: pedidos.length + 1,
        canalPedido,
        status: "AGUARDANDO_PAGAMENTO",
        itens: itens || [],
        criadoEm: new Date().toISOString()
    };
    pedidos.push(novoPedido);
    salvarBanco(pedidos);
    res.status(201).json(novoPedido);
});

app.listen(3000, () => {
    console.log("Servidor com Autenticação rodando na porta 3000!");
});