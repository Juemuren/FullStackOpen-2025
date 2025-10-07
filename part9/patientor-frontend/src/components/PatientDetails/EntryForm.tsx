import { useState, SyntheticEvent } from 'react';
import { isAxiosError } from 'axios';

import { Alert } from '@mui/material';

import patientService from '../../services/patients';

import { Patient } from '../../types';

interface Props {
  id: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const EntryForm = ({ id, patient, setPatient }: Props) => {
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(',') : [],
      type: 'HealthCheck' as const,
    };
    try {
      const addedEntry = await patientService.addEntry(id, entry);
      patient.entries.push(addedEntry);
      setPatient({ ...patient });
      handleCancel();
      setError(null);
    } catch (e) {
      if (isAxiosError(e)) {
        setError(e.response?.data);
      } else {
        console.log(e);
      }
    }
  };

  const handleCancel = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes('');
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h3>New HealthCheck entry</h3>
      <form onSubmit={onSubmit}>
        <div>
          <p>Description</p>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <p>Date</p>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <p>Specialist</p>
          <input type="text" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
        </div>
        <div>
          <p>Healthcheck rating</p>
          <input type="text" value={healthCheckRating} onChange={(e) => setHealthCheckRating(e.target.value)} />
        </div>
        <div>
          <p>Diagnosis codes</p>
          <input type="text" value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} />
        </div>
        <button onClick={handleCancel}>cancel</button>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
