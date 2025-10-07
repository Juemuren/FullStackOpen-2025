import express from 'express';

import patientService from '../services/patientService';
import { newPatientParser, errorMiddleware } from '../middleware';

import { Response, Request } from 'express';
import { Patient, NewPatient, NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getPatientsNoSSN());
});

router.get('/:id', (req, res: Response<Patient>) => {
  res.json(patientService.getPatientsByID(req.params.id));
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
