# Thoughts

Thoughts é uma aplicação web completa que permite aos usuários armazenar e compartilhar pensamentos em formato textual, similar a tweets. O projeto abrange tanto o frontend quanto o backend, utilizando uma arquitetura MVC robusta com conectividade a um banco de dados MySQL. Os usuários podem se cadastrar, criar, visualizar, editar e excluir seus próprios pensamentos, além de explorar os pensamentos de outros usuários.

## Objetivo do Projeto

O objetivo principal do Thoughts é exercitar conceitos fundamentais de desenvolvimento web, como design responsivo de frontend, conectividade de backend com banco de dados, e autenticação de usuários. O projeto foi desenvolvido para fornecer uma base sólida em práticas modernas de desenvolvimento de software.


## Tecnologias Utilizadas

- **CSS3**: Estilização da interface com design responsivo.
- **Handlebars**: Template engine para gerar HTML dinâmico.
- **JavaScript**: Linguagem de programação utilizada tanto no frontend quanto no backend.
- **Node.js**: Ambiente de execução para o JavaScript no servidor.
- **Sequelize**: ORM para integração com o banco de dados MySQL.
- **Express**: Framework para construção de aplicações web em Node.js.


## Estrutura do Projeto

- `index.html`: Contém a estrutura principal da interface.
- `styles.css`: Define a aparência e o layout dos elementos HTML.
- db: Contém os arquivos responsáveis por fazer a conexão inicial com um banco de dados
-  - `conn.js`
- models: Contém os arquivos responsáveis por criar as tabelas referentes as entidades definidas no projeto
- - `Though.js`: Model contendo a lógica por trás da estruturação dos pensamentos
  - `User.js`: Model contendo a lógica por trás da estruturação dos usuários cadastrados na aplicação
- views: Contém os arquivos referentes as views da aplicação, separados entre as de autenticação do usuário e as de exibição e manipulação dos pensamentos
- - auth
  -  - `login.handlebars`
     - `register.handlebars`
  - layouts
  -  - `main.handlebars`
  - thoughts
  -  - `create.handlebars`
     - `dashboard.handlebars`
     - `edit.handlebars`
     - `home.handlebars`
- routes: Contém os arquivos responsáveis pela lógica por trás das rotas presentes na aplicação
- - `authRoutes.js`: Rotas relacionadas a autenticação dos usuários
  - `thoughtsRoutes.js`: Rotas relacionadas a manipulação de pensamentos (thoughs)
- public
-  - css: Contém os arquivos responsáveis por aplicar estilo CSS a aplicação
   -  - `styles.css`: Contém toda estilização das views
   - img: Imagens presentes no projeto
- helpers: Contém arquivos responsáveis por armazenar funções úteis no contexto da aplicação
-  - `auth.js`: Verifica se o usuário se encontra logado de acordo com sua session

## Funcionalidades

- **Cadastro de Usuários**: Permite que novos usuários se registrem na plataforma.
- **Autenticação**: Login seguro para acesso a funcionalidades exclusivas.
- **Criação de Pensamentos**: Usuários autenticados podem criar novos pensamentos.
- **Edição e Exclusão**: Usuários podem editar ou excluir seus próprios pensamentos.
- **Visualização**: Explore pensamentos de outros usuários.
- **Filtro de Pesquisas**: Filtre pensamentos por palavras-chave.
- **Ordenação**: Ordene os pensamentos por data de criação.
- **Design Responsivo**: Interface amigável para dispositivos móveis e desktops.

## Como Usar

1. **Clone o repositório** para sua máquina local

2. **Instale as dependências** necessárias:
    ```bash
    npm install
    ```

3. **Configure o banco de dados**:
   - Crie um schema denominado "thoughts" em seu MySQL local.
   - Atualize as configurações de conexão no arquivo `conn.js` em `db`.

4. **Inicie o servidor**:
   ```bash
   npm start

5. Acesse a aplicação em seu navegador:
   ```bash
   http://localhost:3000

