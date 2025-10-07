import z from 'zod';

import { NewPatientSchema, NewEntrySchema } from './utils';

import { Response, Request, NextFunction } from 'express';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

interface Params {
  id: string;
}

export const newEntryParser = (req: Request<Params>, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send(error.issues[0].message);
  } else {
    next(error);
  }
};
