import { useState, SyntheticEvent } from 'react';
import { isAxiosError } from 'axios';

import patientService from '../../services/patients';

import { Alert, TextField, Grid, Button, Input, InputLabel } from '@mui/material';
import { Patient, EntryType, Diagnosis } from '../../types';

import DiagnosisCodesSelector from './DiagnosisCodesSelector';

interface Props {
  id: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryForm = ({ id, patient, setPatient, diagnoses }: Props) => {
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes,
      type: EntryType.HealthCheck as const,
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
    setDiagnosisCodes([]);
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h3>New HealthCheck entry</h3>
      <form onSubmit={onSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <Input type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />

        <DiagnosisCodesSelector
          diagnoses={diagnoses}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HealthCheckEntryForm;
