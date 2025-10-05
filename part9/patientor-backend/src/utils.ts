import z from 'zod';

import { NewPatient, Gender } from './types';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/^\d{6}-\d{2,3}[A-Z0-9]$/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export default toNewPatient;
