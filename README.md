# API Node.js com TypeScript

Esta é uma API base escalável desenvolvida com Node.js, TypeScript, Sequelize e PostgreSQL. Ela implementa operações CRUD para um modelo de usuário, autenticação via JWT e é protegida por middleware.

## Recursos da API
- Rota de login para autenticação de usuários.
- CRUD completo na rota de usuários.
- Middleware para verificação de token JWT em rotas protegidas.
- Banco de dados PostgreSQL configurável localmente ou via Docker.
- Criação automática de um usuário admin durante a inicialização.

## Estrutura da API

**config/** Configurações globais da aplicação, como variáveis de ambiente e conexões.
**controllers/** Lógica de controle, responsável por receber as requisições e chamar os serviços necessários.
**middlewares/** Funções intermediárias para validações e autenticações.
**models/** Definições das entidades e interação com o banco de dados.
**routes/** Definição das rotas da API.
**service/** Regras de negócio e lógica principal da aplicação.
**utils/** Funções utilitárias e helpers genéricos.
**app.ts** Configuração principal do aplicativo, incluindo middlewares e rotas.
**server.ts** Inicialização do servidor.

---

## Configuração e Instalação

### Requisitos
- Node.js 
- PostgreSQL ou Docker
- npm ou yarn

### Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositório>
   cd <nome-do-repositório>
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure o arquivo `.env` na raiz do projeto:
   ```env
# Porta do servidor da API
PORT=3000

# Configurações do Banco de Dados PostgreSQL
DB_NAME=nome_do_banco
DB_USER=usuario_do_banco
DB_PASSWORD=senha_do_banco
DB_HOST=localhost
DB_PORT=5432

# Configurações do JWT
JWT_SECRET=segredo_do_jwt
JWT_EXPIRES_IN=1h

### Configuração do JWT_EXPIRES_IN

O parâmetro `JWT_EXPIRES_IN` define o tempo de expiração do token JWT gerado pela API. Esse valor determina por quanto tempo o token será válido após sua criação. Quando o tempo expira, o token se torna inválido, e o usuário precisará fazer login novamente para obter um novo token.

#### Exemplos de valores para `JWT_EXPIRES_IN`:
- `1h`: O token expira 1 hora após sua criação.
- `30m`: O token expira 30 minutos após sua criação.
- `7d`: O token expira 7 dias após sua criação.
- `15m`: O token expira 15 minutos após sua criação.
- `2h`: O token expira 2 horas após sua criação.
   ```

### Configuração do Banco de Dados

#### Usando Docker (Recomendado)
1. Certifique-se de que o Docker está instalado e rodando.
2. Use o arquivo `docker-compose.yml` fornecido:
   ```bash
   docker-compose up -d
   ```
3. Atualize a variável `DATABASE_URL` no `.env` para apontar para o banco do Docker:
   ```env
   DATABASE_URL=postgres://admin:admin@localhost:5432/nome_do_banco
   ```

#### Banco Local
1. Crie um banco de dados PostgreSQL manualmente.
2. Atualize `DATABASE_URL` no `.env` com as credenciais locais.

### Inicie a Aplicação
1. Execute a aplicação:
   ```bash
   npm run dev
   ```
   O servidor iniciará em [http://localhost:3000](http://localhost:3000).

2. Durante a inicialização, um usuário admin será criado automaticamente, com as credenciais:
   - **Email:** admin@admin.com
   - **Senha:** $admin

---

## Rotas Disponíveis

### Rota de Login
- **POST** `/login`
  - **Descrição:** Gera um token JWT para autenticação.
  - **Corpo da Requisição:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Resposta de Sucesso:**
    ```json
    {
      "message": "Login bem-sucedido!",
      "token": "string"
    }
    ```
  - **Códigos de Status:**
    - 200: Login realizado com sucesso.
    - 401: Credenciais inválidas.

### Rotas de Usuário
#### Criar Usuário
- **POST** `/user`
  - **Protegida por JWT**
  - **Corpo da Requisição:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string"
    }
    ```
  - **Resposta de Sucesso:**
    ```json
    {
      "message": "Agente cadastrado!",
      "data": { ... }
    }
    ```
  - **Códigos de Status:**
    - 201: Usuário criado com sucesso.
    - 400: Erro ao criar usuário.

#### Listar Usuários
- **GET** `/users`
  - **Protegida por JWT**
  - **Resposta de Sucesso:**
    ```json
    {
      "message": "Usuarios encontrados!",
      "users": [ ... ]
    }
    ```
  - **Códigos de Status:**
    - 200: Usuários encontrados.
    - 400: Erro ao buscar usuários.

#### Buscar Usuário por ID
- **GET** `/user/:id`
  - **Protegida por JWT**
  - **Resposta de Sucesso:**
    ```json
    {
      "message": "Usuario encontrado!",
      "user": { ... }
    }
    ```
  - **Códigos de Status:**
    - 200: Usuário encontrado.
    - 400: Erro ao buscar usuário.

#### Atualizar Usuário
- **PUT** `/user/:id`
  - **Protegida por JWT**
  - **Corpo da Requisição:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string"
    }
    ```
  - **Resposta de Sucesso:**
    ```json
    {
      "message": "Agente editado!",
      "id": "string"
    }
    ```
  - **Códigos de Status:**
    - 200: Usuário atualizado.
    - 400: Erro ao atualizar usuário.

#### Deletar Usuário
- **DELETE** `/user/:id`
  - **Protegida por JWT**
  - **Resposta de Sucesso:**
    ```json
    {
      "message": "Agente deletado!",
      "id": "string"
    }
    ```
  - **Códigos de Status:**
    - 204: Usuário deletado.
    - 400: Erro ao deletar usuário.

---

## Middleware de Proteção
As rotas protegidas usam um middleware que valida o token JWT enviado no cabeçalho da requisição:
- **Cabeçalho:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- Caso o token seja inválido ou ausente, a rota retorna:
  - **401 Unauthorized:** "Token inválido ou não fornecido."

---

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

