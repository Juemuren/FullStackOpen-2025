import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsByID = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getPatientsNoSSN = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);

  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((p) => p.id === id);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsByID,
  getPatientsNoSSN,
  addPatient,
  addEntry,
};
