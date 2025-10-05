import express from 'express';
import patientService from '../services/patientService';

import { Response } from 'express';
import { PatientNoSSN } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSSN[]>) => {
  res.send(patientService.getPatientsNoSSN());
});

export default router;
