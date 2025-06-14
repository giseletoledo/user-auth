import express, { Request, Response, NextFunction, Application } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { z } from 'zod';
import { UserSchema, LoginSchema } from './schemas/user.schema.js';
import { User } from './types/user.type.js';
import responseHandler from './utils/responseHandler.js';
import { JWT_SECRET, PORT } from './utils/constants.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições. Tente novamente mais tarde.'
});
app.use(limiter);

// Simulação de um banco de dados em memória
const users: User[] = [];

const authenticateJWT = (
  req: Request & { user?: { email: string; name: string } },
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        responseHandler.handleError(res, 'Token inválido', 401);
        return;
      }
      
      req.user = user as { email: string; name: string };
      next();
    });
  } else {
    responseHandler.handleError(res, 'Autenticação necessária', 401);
  }
};

app.post('/signup', async (req: Request, res: Response) => {
  try {
    const validatedData = UserSchema.parse(req.body);
    const { name, email, password } = validatedData;

    if (users.some(user => user.email === email)) {
      responseHandler.handleError(res, 'Usuário já cadastrado', 409);
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });

    const token = jwt.sign({ name, email }, JWT_SECRET, { expiresIn: '1h' });

    responseHandler.handleSuccess(res, {
      message: 'Cadastro realizado com sucesso',
      tokenJWT: token
    }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      responseHandler.handleError(
        res, 
        'Dados inválidos', 
        400, 
        error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      );
      return;
    }
    console.error('Erro ao criar usuário:', error);
    responseHandler.handleError(res, 'Erro ao criar usuário', 500);
  }
});

app.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const user = users.find(user => user.email === email);
    
    if (!user) {
      responseHandler.handleError(res, 'Usuário não encontrado', 404);
      return; 
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      responseHandler.handleError(res, 'Login inválido', 401);
      return;
    }

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

    responseHandler.handleSuccess(res, {
      tokenJWT: token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      responseHandler.handleError(
        res, 
        'Dados inválidos', 
        400, 
        error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      );
      return; 
    }
    console.error('Erro ao realizar login:', error);
    responseHandler.handleError(res, 'Erro ao realizar login', 500);
  }
});

app.get('/users', authenticateJWT, (req: Request, res: Response) => {
  responseHandler.handleSuccess(
    res, 
    users.map(u => ({ name: u.name, email: u.email }))
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});