# Projeto Multidisciplinar - Trilha Back-End (Rede "Raízes do Nordeste")

Repositório da atividade prática de Back-End desenvolvida para o curso de Sistemas Análise e Desenvolvimento da Uninter.

## Pré-requisitos
* **Node.js** (versão LTS recomendada) instalado na máquina.
* **Git** instalado.

## Como configurar e executar o projeto

1. Clone o repositório ou baixe os arquivos na sua máquina.
2. Abra o terminal na pasta raiz do projeto.
3. Instale as dependências executando o comando:
   ```bash
   npm install
   Inicie o servidor da API:

Bash
node server.js
O servidor estará ativo na porta 3000.

Endpoints Principais da API
POST /auth/login

Finalidade: Autenticar o usuário e retornar o token JWT de acesso.

Body (JSON):

JSON
{
  "email": "cliente@exemplo.com",
  "senha": "Senha@123"
}
POST /pedidos

Finalidade: Criar um novo pedido validando obrigatoriamente o canal de atendimento.

Headers: Authorization: Bearer <seu_token>

Body (JSON):

JSON
{
  "canalPedido": "APP",
  "itens": [
    { "produtoId": 101, "quantidade": 2 }
  ]
}
POST /pagamentos/mock

Finalidade: Simular a aprovação de pagamento externo (gateway mock).

PATCH /pedidos/:id/status

Finalidade: Atualizar o status operacional do pedido.
