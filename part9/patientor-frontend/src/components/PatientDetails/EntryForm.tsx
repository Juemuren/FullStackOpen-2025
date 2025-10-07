import { useState } from 'react';

import { Select, SelectChangeEvent, MenuItem } from '@mui/material';

import { Patient, EntryType, Diagnosis } from '../../types';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';

interface Props {
  id: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  diagnoses: Diagnosis[];
}

const EntryForm = ({ id, patient, setPatient, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

  const typeOptions = Object.values(EntryType).map((v) => ({
    value: v,
    label: v.toString(),
  }));

  const handleType = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(EntryType).find((g) => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const typeSelector = () => (
    <Select label="Type" fullWidth value={type} onChange={handleType}>
      {typeOptions.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );

  switch (type) {
    case EntryType.HealthCheck:
      return (
        <div>
          {typeSelector()}
          <HealthCheckEntryForm id={id} patient={patient} setPatient={setPatient} diagnoses={diagnoses} />
        </div>
      );
    case EntryType.Hospital:
      return (
        <div>
          {typeSelector()}
          <HospitalEntryForm id={id} patient={patient} setPatient={setPatient} diagnoses={diagnoses} />
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          {typeSelector()}
          <OccupationalHealthcareEntryForm id={id} patient={patient} setPatient={setPatient} diagnoses={diagnoses} />
        </div>
      );
  }
};

export default EntryForm;
