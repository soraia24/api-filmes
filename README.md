# Api Filmes
Este projeto marca o início da minha jornada no desenvolvimento Back-End.
Trata-se da minha primeira API, criada para o gerenciamento de filmes, com o objetivo de oferecer uma forma rápida e prática de conhecer informações essenciais sobre cada título — ajudando o usuário a decidir se o filme vale a pena assistir.

A API armazena e disponibiliza dados como:

- Título
- Diretor
- Ano de lançamento
- Sinopse

#### Login Administrador 
- login: admin 
- senha: Backend2

# Tecnologias Utilizadas
- javaScript 
- Node.js
- Express
- bcrypt
- jsonwebtoken
- lowdb (banco de dados JSON)

# Endpoints Usuarios 

- POST	usuarios/login	Realiza o login e retorna um token JWT
- POST	usuarios/cadastrar	Cadastra novo usuário
- GET	usuarios	Lista todos os usuários 
- GET	usuarios/id	Lista usuários especifico
- PUT   usuarios/id Alterar Parcial  ou Total 

# Endpoints Filmes 

- POST	Filmes/cadastrar	Cadastra novo Filme
- GET	Filmes	Lista todos os Filmes 
- GET	Filmes/id	Lista Filmes especifico
- PUT   Filmes/id Alterar Parcial  ou Total 


## Funcionalidades e Permissões

###  Sem Login
- Pode **apenas cadastrar um novo usuário comum**.

---

### Usuário Comum
**Permissões:**
- Pesquisar **todos os filmes**.
- Pesquisar **filmes por ID**.
- **Alterar** seu próprio cadastro.
- **Excluir** sua própria conta.

---

### Administrador (Admin)
**Permissões avançadas:**

#### Gerenciamento de Filmes
-  **Cadastrar** novos filmes.
-  **Alterar** informações de filmes.
-  **Excluir** filmes.
-  **Pesquisar todos os filmes**.
-  **Pesquisar filme por ID**.

#### Gerenciamento de Usuários
- **Cadastrar** usuários comuns e administradores.
- **Alterar** dados de qualquer usuário.
- **Excluir** qualquer usuário.
- **Pesquisar todos os usuários**.
- **Pesquisar usuário por ID**.


# Autor e contato
Soraia Araujo 
github: https://github.com/soraia24 
