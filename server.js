import express from 'express';
import bcrypt from 'bcrypt';
import responseHandler from './responseHandler.js';

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return responseHandler.handleError(res, 'Informe os campos corretamente');
    }

    try {
        // Hash da senha utilizando bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

         // Verificação de duplicação por nome e email
    if (users.find(user => user.name === name && user.email === email)) {
        return responseHandler.handleError(res, 'Usuário já cadastrado');
      }

        // Armazenamento do usuário no array
        users.push({ name, email, password: hashedPassword });
        console.log(users)

        // Se o cadastro for bem-sucedido, retorna 201
        return responseHandler.handleSuccess(res, { message: 'Cadastro realizado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        console.log(res)
        return responseHandler.handleError(res, 'Erro ao criar usuário');
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return responseHandler.handleError(res, 'Informe os campos corretamente');
    }

    // Simulação de busca do usuário pelo email no array de usuários
    const user = users.find(user => user.email === email);

    if (!user) {
        return responseHandler.handleError(res, 'Usuário não encontrado');
    }

    try {
        // Comparação da senha fornecida com a senha hash no array de usuários utilizando bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return responseHandler.handleSuccess(res, { 
                tokenJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                } 
            });
        } else {
            return responseHandler.handleError(res, 'Login inválido');
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return responseHandler.handleError(res, 'Erro ao realizar login');
    }
});

app.get('/users', (req, res) => {
    // Retorna todos os usuários
    return responseHandler.handleSuccess(res, users);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
