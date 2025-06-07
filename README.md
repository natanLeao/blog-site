# 📝 Blog Pessoal

Sistema de um **Blog Pessoal** desenvolvido com:

- 🚀 **Backend:** Node.js + Express + MySQL + JWT  
- 🎨 **Frontend:** HTML, CSS, JavaScript (servido por NGINX)  
- 🗄️ **Banco de Dados:** MySQL  
- 🐳 **Orquestração:** Docker + Docker Compose  

---

## 🗂️ Estrutura do Projeto

```
.
├── backend/              → API Node.js + Express
├── database/             → Banco MySQL com script de criação
├── frontend/             → Interface Web + NGINX
├── docker-compose.yaml   → Gerencia os containers
└── README.md
```

---

## 🚀 Como rodar o projeto

### 🔧 Pré-requisitos

- ✔️ [Docker](https://www.docker.com/) instalado  
- ✔️ [Docker Compose](https://docs.docker.com/compose/) instalado  

---

### ▶️ Passo a passo:

1️⃣ Clone o repositório:

```bash
git clone https://github.com/seu-usuario/blog-pessoal.git
cd blog-pessoal
```

2️⃣ Rode o projeto:

```bash
docker-compose up --build
```

3️⃣ Acesse no navegador:

- 🔗 **Frontend:** [http://localhost:8080](http://localhost:8080)  
- 🔗 **Backend API:** [http://localhost:3000/api](http://localhost:3000/api)  
- 🔗 **MySQL:** Porta 3306

---

## 🔗 API - Endpoints

### 🔐 Autenticação

| Método | Rota       | Descrição                 |
|--------|------------|---------------------------|
| POST   | `/register`| Cadastrar novo usuário    |
| POST   | `/login`   | Realizar login e receber token |

### 📝 Postagens (requer autenticação via Bearer Token)

| Método | Rota             | Descrição                          |
|--------|------------------|------------------------------------|
| POST   | `/posts`         | Criar nova postagem                |
| PUT    | `/posts/:id`     | Editar postagem existente          |
| DELETE | `/posts/:id`     | Deletar postagem por ID            |
| GET    | `/posts`         | Listar todas as postagens          |
| GET    | `/posts?mine=true` | Listar somente postagens do usuário |
| GET    | `/posts/:id`     | Buscar postagem por ID             |

### 🔸 Exemplo de JSON para criação/edição de postagem:
```json
{
  "titulo": "Minha primeira postagem",
  "conteudo": "Este é o conteúdo do post"
}
```

---

## 🗄️ Banco de Dados

- Banco: `blog`  
- Tabelas: `usuarios`, `postagens`  

O banco é criado automaticamente via o script `init.sql` na pasta `/database`.

---

## 🐳 Comandos úteis

- Subir containers:

```bash
docker-compose up --build
```

- Derrubar containers:

```bash
docker-compose down
```

- Ver containers rodando:

```bash
docker ps
```

---

Projeto desenvolvido por **Natanael Leão**.

---