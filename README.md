# IBS Desafio
# Gerenciador de Pessoas e Endereços

Um sistema completo para gerenciamento de pessoas e seus endereços, desenvolvido em Node.js e React. Esta aplicação permite realizar operações CRUD em registros de pessoas, incluindo detalhes como nome, sexo, data de nascimento, estado civil e múltiplos endereços.

## Pré-requisitos

Para executar este projeto localmente, é necessário ter o Docker e o Docker Compose instalados na sua máquina.

## Funcionalidades Principais

- **CRUD de Pessoas**: Cadastrar, visualizar, editar e excluir registros de pessoas.
- **Múltiplos Endereços**: Cada pessoa pode ter múltiplos endereços, com campos como CEP, endereço, número, complemento, bairro, estado e cidade.
- **Consulta de CEP**: Integração com API de consulta de CEP para preenchimento automático de endereços.
- **Idade e Aniversário**: Ao cadastrar uma pessoa, exibe a idade e quantos dias faltam para o próximo aniversário, com mensagem de parabéns se for o dia do aniversário.

## Requisitos Adicionais

- **Validações e Tratamento de Erros**: Validar campos de entrada e tratar erros em todas as camadas da aplicação.
- **Framework NestJS**: Utilização do framework NestJS no back-end.
- **Framework React**: Utilização do framework React no front-end.
- **Paginação e Busca**: Suporte à paginação e mecanismo de busca na listagem de pessoas.
- **Autenticação e Autorização**: Sistema de autenticação de usuários para acesso à API .

## Docker Compose

Este projeto utiliza Docker Compose para orquestrar os containers. Os serviços incluem:

- **MySQL**: Container com MySQL rodando na porta 3306.
- **Backend NestJS**: Container com o backend rodando na porta 3000.
- **Frontend React**: Container com o frontend rodando na porta 4200.

### Iniciar os Serviços Docker

Para iniciar os serviços, execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build
```

### Estrutura Banco de dados MYSQL

Estrutura montada automaticamente em um container 
```bash

CREATE DATABASE IF NOT EXISTS IBS_SISTEMAS;

USE IBS_SISTEMAS;

CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sex ENUM('M', 'F') NOT NULL,
    birthDate DATE NOT NULL,
    maritalStatus ENUM('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Outro') NOT NULL
);

CREATE TABLE IF NOT EXISTS Address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    people_id INT,
    cep VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(255),
    district VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE
```
##  Backend
Nestjs - segurança JWT
porta 3000
Dependencia MYSQL

### Rotas Autenticação e Token JWT

Uso e acesso permitidos com validade do token ao espirar o token necessario novo login.

- **Login e Receber Token JWT**
  - `POST http://localhost:3000/auth/login`
  - Usuario : erasmo
  - senha : 3727

### CRUD de Pessoas e Endereços

- **Buscar Todas as Pessoas**
  - `GET http://localhost:3000/peoples`

- **Criar uma Nova Pessoa**
  - `POST http://localhost:3000/peoples`

- **Listar Todas as Pessoas**
  - `GET http://localhost:3000/peoples`

- **Obter Detalhes de Uma Pessoa Específica**
  - `GET http://localhost:3000/peoples/:id`

- **Atualizar Detalhes de Uma Pessoa Específica**
  - `PUT http://localhost:3000/peoples/:id`

- **Adicionar um Endereço a Uma Pessoa**
  - `POST http://localhost:3000/peoples/:id/addresses`

- **Atualizar um Endereço Específico de Uma Pessoa**
  - `PUT http://localhost:3000/peoples/:personId/addresses/:addressId`

- **Deletar um Endereço Específico de Uma Pessoa**
  - `DELETE http://localhost:3000/peoples/:personId/addresses/:addressId`

- **Deletar Uma Pessoa Específica**
  - `DELETE http://localhost:3000/peoples/:id`

###  Front-end
React *
porta 4200
Dependecia Backend

Após iniciar os serviços, o front-end estará disponível no endereço:
```bash
http://localhost:4200
```

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/35a84e03-2f8c-4c9b-9ae6-a1754579235d>

Login deve ser efetuado com usuario padrao do projeto User = erasmo  senha = 3727

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/7f62f641-5e4e-41a6-a825-6a0c74c96658>

Tela Dashboard acesso a operações Criar | Editar | Listar | Apagar

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/fd619d59-4e82-4d23-951d-035063a531ba>

Cadastro de Usuario e Endereço

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/35364d3a-fc6b-4286-9f15-381d140f34aa>

Ao cadastrar mensagem retornando a idade e calculo de dias para o aniversario

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/17791720-0b95-45b2-9ca7-28510b3f1c11>

Tela de busca com botoes de editar e apagar o usuario, imoveis sao mostrados na quantidade que o usuario tiver .

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/fd3ff01f-1925-443f-ba2b-4b3657fa05ac>

Edita usuario inclui um endereço, edita endereço e apaga um endereço

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/5055c7a6-cd3b-4f34-bf5b-3d62e87d9878>

Tela que adiciona um novo endereço

<img width = "600px" src=https://github.com/erascardsilva/IBS_Desafio/assets/70297459/6f4c34e9-e419-4eed-8e23-b644c629c65c>

Atualiza um endereço












