export type User = {
  name: string;
  email: string;
  password: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
      };
    }
  }
}