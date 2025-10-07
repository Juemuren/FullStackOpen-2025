import { useState } from 'react';

import { Select, SelectChangeEvent, MenuItem } from '@mui/material';

import { Patient, EntryType } from '../../types';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';

interface Props {
  id: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const EntryForm = ({ id, patient, setPatient }: Props) => {
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

  const selectSection = () => (
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
          {selectSection()}
          <HealthCheckEntryForm id={id} patient={patient} setPatient={setPatient} />
        </div>
      );
    case EntryType.Hospital:
      return (
        <div>
          {selectSection()}
          <HospitalEntryForm id={id} patient={patient} setPatient={setPatient} />
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          {selectSection()}
          <OccupationalHealthcareEntryForm id={id} patient={patient} setPatient={setPatient} />
        </div>
      );
  }
};

export default EntryForm;
