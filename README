# 🚀 Testes Automatizados – API Serverest

Este projeto contém um conjunto de **testes automatizados de API** utilizando **PACTUM** de acordo com o desafio solicitado

## 📌 Objetivo do Projeto

Garantir a cobertura dos seguintes endpoints da API Serverest:

- **POST /login**
- **GET /users**
- **POST /users**
- **GET /users/{id}**
- **PUT /users/{id}**
- **DELETE /users/{id}**

Incluindo:
- Fluxo completo CRUD
- Uso de token JWT
- Testes positivos e negativos
- Validação de status code e estrutura da resposta
- Execução automática em pipeline CI/CD

## 🛠 Tecnologias Utilizadas

- **Pactum**
- **GitHub Actions**
- **Node.js**

## 🔧 Como executar os testes localmente

### 1️⃣ Instale Node.js (caso não tenha)
https://nodejs.org/

### 2️⃣ Instale 
```bash
npm install 
```

### 3️⃣ Execute os testes
```bash
npm test
```

## 🔄 Pipeline CI – GitHub Actions

Acessar a aba do github actions e solicitar reexecução, após a execução é gerado um relatorio como artefato para dowload

## ✔ Casos de Teste Implementados

### 🟢 Positivos
- Login com sucesso  
- Criar usuário  
- Listar usuários  
- Buscar por ID  
- Atualizar usuário  
- Deletar usuário  

### 🔴 Negativos
- Login com email incorreto
- Login com senha incorreta
- Criação de usuario com email duplicado
- Buscar usuario com id abaixo de 16 caracteres
- Buscar usuario com id acima de 16 caracteres
- Buscar usuario com id não encontrado
- Atualizar usuario com email ja em uso
- Deletar usuario com carrinho
- Campos obrigatórios  
- ID inexistente (GET/DELETE)  

## 🏁 Autor  
Aline Soares da Silva
