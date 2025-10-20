## [Backend] Desafio Autodidata - Potência Tech

- 14/06/2025 - upgrade para typescript e adicionadas boas práticas de segurança com helmet e dotenv.

**Description:** 

Esta é uma API Node.js para gerenciar registros e logins de usuários. Ela fornece funcionalidades para:

- **Listar Usuários (GET /users):** Obter uma lista de todos os usuários registrados no sistema. (**Observação:** Isso é apenas para fins de demonstração)
- **Registrar Usuários (POST /signup):** Permite que os usuários se registrem no aplicativo fornecendo seu nome, email e senha. A senha é criptografada com segurança usando bcrypt antes de ser armazenada no sistema.
- **Login do Usuário (POST /signin):** Permite que os usuários façam login no aplicativo usando seu email e senha. A API verifica as credenciais e retorna uma mensagem de sucesso ou uma mensagem de erro se o login falhar.

**Tecnologias:**

- Node.js: Ambiente de execução JavaScript para desenvolvimento do lado do servidor.
- Express.js: Framework web para construir APIs em Node.js.
- bcrypt: Biblioteca de hash de senha para armazenamento seguro de senha..

**Endpoints da API:**

| Método | URL | Descrição |
| --- | --- | --- |
| GET | /users | Recupera uma lista de todos os usuários (para fins de demonstração). |
| POST | /signup | Registra um novo usuário. |
| POST | /signin | Faz o login de um usuário. |

**Exemplo de Uso:**

**Registrar um Usuário:**

```
POST http://localhost:3000/signup
Content-Type: application/json
{
  "nome": "Oliver",
  "email": "oliver@teste.com",
  "senha": "teste123"
}
```


**Fazer Login de um Usuário:**
```
POST http://localhost:3000/signin

Content-Type: application/json

{
  "email": "oliver@teste.com",
  "senha": "teste123"
}
```

# Opcional

## Usando a Extensão REST Client no Visual Studio Code para Testes de API

### Introdução

O Visual Studio Code oferece diversas extensões para melhorar a produtividade do desenvolvimento, incluindo a extensão REST Client. Essa extensão permite enviar e receber requisições HTTP para testar e explorar APIs diretamente da IDE, substituindo postman ou insomnia. O arquivo resquest.rest faz as requisições, clicar em send acima dos métodos, depois de instalar a extensão.

### Instalação e Configuração

1. **Instalar a Extensão REST Client:**
    
    Abra o Visual Studio Code e navegue até a aba Extensões (Ctrl+Shift+X). Procure por "REST Client" e clique no botão "Instalar".
    
2. **Configurar Cabeçalhos de Requisição:**
    
    Clique no ícone "Configurações" (símbolo de engrenagem) no canto superior direito e selecione "Configurações". Na barra de pesquisa, digite "REST Client". Em "REST Client: Cabeçalhos de Requisição", você pode definir cabeçalhos padrão que serão incluídos em todas as requisições.
