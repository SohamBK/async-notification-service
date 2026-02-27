import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { BadRequestError } from '../errors/http-errors';

interface ValidationSchemas {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          throw new BadRequestError(error.details.map((d) => d.message).join(', '));
        }

        req.body = value;
      }

      if (schemas.query) {
        const { error, value } = schemas.query.validate(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          throw new BadRequestError(error.details.map((d) => d.message).join(', '));
        }

        req.query = value;
      }

      if (schemas.params) {
        const { error, value } = schemas.params.validate(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          throw new BadRequestError(error.details.map((d) => d.message).join(', '));
        }

        req.params = value;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
