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

### Iniciar os Serviços

Para iniciar os serviços, execute o seguinte comando na raiz do projeto:

```bash
docker-compose up
```

### Estrutura Banco de dados mysql 
Que é montada automaticamente em um container 
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
## Rotas do Backend

### Autenticação e Token JWT

- **Login e Receber Token JWT**
  - `POST http://localhost:3000/auth/login`

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

### Acessar o Front-end

Após iniciar os serviços, o front-end estará disponível no endereço:
http://localhost:4200

![image](https://github.com/erascardsilva/IBS_Desafio/assets/70297459/bb0dadbd-f0dd-4425-bae4-c7b8b1f0bfcf)

