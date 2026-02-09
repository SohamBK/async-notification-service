import { Response } from 'express';

export function success<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta: Record<string, unknown> = {},
) {
  return res.status(statusCode).json({
    success: true,
    data,
    meta,
  });
}

export function failure(res: Response, statusCode: number, code: string, message: string) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  });
}
