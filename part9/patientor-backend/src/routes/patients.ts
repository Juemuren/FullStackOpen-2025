import express from 'express';
import patientService from '../services/patientService';

import { Response } from 'express';
import { PatientNoSSN, NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSSN[]>) => {
  res.send(patientService.getPatientsNoSSN());
});

router.post('/', (req, res) => {
  try {
    const newPatient = req.body as NewPatient;

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
