import { Response } from 'express';

type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

type ErrorResponse = {
  status: 'error';
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
};

export default {
  handleSuccess<T>(res: Response, data: T, statusCode = 200) {
    const response: SuccessResponse<T> = { status: 'success', data };
    return res.status(statusCode).json(response);
  },

  handleError(
    res: Response, 
    message: string, 
    statusCode = 400, 
    errors?: Array<{ field?: string; message: string }>
  ) {
    const response: ErrorResponse = { status: 'error', message };
    if (errors) response.errors = errors;
    return res.status(statusCode).json(response);
  }
};


