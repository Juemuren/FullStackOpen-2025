import { useState, SyntheticEvent } from 'react';
import { isAxiosError } from 'axios';

import patientService from '../../services/patients';

import { Alert, TextField, Grid, Button } from '@mui/material';
import { Patient, EntryType } from '../../types';
interface Props {
  id: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const OccupationalHealthcareEntryForm = ({ id, patient, setPatient }: Props) => {
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entry = {
      description,
      date,
      specialist,
      employerName,
      sickLeave:
        sickLeaveStartDate !== '' && sickLeaveEndDate !== ''
          ? {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            }
          : undefined,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(',') : [],
      type: EntryType.OccupationalHealthcare as const,
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
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setDiagnosisCodes('');
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h3>New OccupationalHealthcare entry</h3>
      <form onSubmit={onSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField label="Date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Sickleave start"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
          label="Sickleave end"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
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

export default OccupationalHealthcareEntryForm;
