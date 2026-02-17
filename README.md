# User Management System

Sistema de gerenciamento de usuários com autenticação JWT. Desenvolvido com Node.js no back-end e React.js no front-end.

## Tecnologias Usadas

### Back-end
- Node.js com Express
- JWT para autenticação
- CORS para permitir requisições do front-end

### Front-end
- React.js
- Axios
- LocalStorage para guardar o token de autenticação

## Funcionalidades

- Login com autenticação JWT
- Listar todos os usuários
- Criar novos usuários
- Editar usuários existentes
- Excluir usuários
- Rotas protegidas
- Validação para não permitir emails duplicados

## O que precisa ter instalado

- Node.js
- npm instalado

## Como rodar o projeto

### Passo 1: Rodar o Back-end

1. Abra o terminal e entre na pasta do servidor:
```
cd test-sps-server
```

2. Instale as dependências:
```
npm install
```

3. Crie um arquivo chamado `.env` dentro da pasta `test-sps-server` com este conteúdo:
```
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

Você pode colocar qualquer coisa no JWT_SECRET, tipo: `minha_chave_secreta_123`

4. Inicie o servidor:
```
npm run dev
```

O servidor vai rodar em http://localhost:3000

### Passo 2: Rodar o Front-end

1. Abra um NOVO terminal (deixe o do back-end rodando) e entre na pasta do front:
```
cd test-sps-react
```

2. Instale as dependências:
```
npm install
```

3. Crie um arquivo chamado `.env` dentro da pasta `test-sps-react` com este conteúdo:
```
PORT=3001
REACT_APP_SERVER_URL=http://localhost:3000
```

4. Inicie o front-end:
```
npm start
```

O front-end vai abrir automaticamente no navegador, geralmente em http://localhost:3001

### Passo Alternativo: Iniciar o projeto todo de uma vez 

1. Instale as dependências dentro da pasta `test-sps-server` utlizando o terminal:
```
npm install
```

2. Instale as dependências dentro da pasta `test-sps-react` utlizando o terminal:
```
npm install
```

3. Crie um arquivo chamado `.env` dentro da pasta `test-sps-server` com este conteúdo:
```
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

4. Crie um arquivo chamado `.env` dentro da pasta `test-sps-react` com este conteúdo:
```
PORT=3001
REACT_APP_SERVER_URL=http://localhost:3000
```

5. Na pasta raiz do projeto, abra o arquivo start-project.bat em um editor de texto.
6. Ajuste a porta do Backend (linha 11) para a mesma porta definida no arquivo .env do Backend.
7. Ajuste a porta do Frontend (linha 12) para a mesma porta definida no arquivo .env do Frontend.
8. Salve o arquivo.
9. Execute o start-project.bat.
   - O projeto será iniciado automaticamente.

## Como fazer login

Quando o sistema abrir, você vai precisar fazer login. Use estas credenciais:

- Email: admin@spsgroup.com.br
- Senha: 1234

Depois do login, você vai conseguir ver a lista de usuários e fazer o CRUD completo.


## Observações Importantes

- O banco de dados é em memória (um array), então só o usuário admin fica salvo porque está no código.
- Se você tentar acessar uma rota protegida sem estar logado, vai dar erro 401 ou 403

## Funcionalidades Implementadas de acordo a problematica proposta

- Autenticação com JWT no back-end
- Middleware que protege as rotas
- CRUD completo de usuários no back-end
- Validação para não permitir email duplicado
- Página de login no front-end
- Proteção de rotas no front-end (redireciona para login se não estiver autenticado)
- Listagem de usuários
- Criação de novos usuários
- Edição de usuários
- Exclusão de usuários
- Integração completa entre front e back

## Possíveis Problemas

Se der erro de conexão, verifique se o arquivo .env do front-end tem a URL correta do servidor.
Se o token não funcionar, faça login novamente para gerar um novo token.
