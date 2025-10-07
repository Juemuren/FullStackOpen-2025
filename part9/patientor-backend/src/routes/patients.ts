import express from 'express';

import patientService from '../services/patientService';
import { newPatientParser, newEntryParser, errorMiddleware } from '../middleware';

import { Response, Request } from 'express';
import { Patient, NewPatient, NonSensitivePatient, Entry, NewEntry } from '../types';

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

interface Params {
  id: string;
}

router.post('/:id/entries', newEntryParser, (req: Request<Params, unknown, NewEntry>, res: Response<Entry>) => {
  const addedEntry = patientService.addEntry(req.params.id, req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
