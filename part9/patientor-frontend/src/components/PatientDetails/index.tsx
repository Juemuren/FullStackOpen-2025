import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';

import { Patient, Diagnosis } from '../../types';

import EntryDetails from './EntryDetails';
import EntryForm from './EntryForm';

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  const match = useMatch('/patients/:id');
  const id = match?.params.id as string;

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getByID(id);
      setPatient(patient);
    };

    fetchPatient(id);
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  const genderIcon = (gender: string | undefined) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      default:
        break;
    }
  };

  const entryFormStyle = {
    border: 'dashed',
    padding: 10,
    paddingBottom: '80px',
  };

  const entryStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    margin: 5,
    borderRadius: 10,
  };

  return (
    <div>
      <h2>
        <span>{patient?.name} </span>
        {genderIcon(patient?.gender)}
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <div style={entryFormStyle}>
        {patient?.id && (
          <EntryForm
            id={patient?.id}
            patient={patient}
            setPatient={setPatient as React.Dispatch<React.SetStateAction<Patient>>}
            diagnoses={diagnoses!}
          />
        )}
      </div>
      <h3>entries</h3>
      {patient?.entries.map((e) => (
        <div key={e.id} style={entryStyle}>
          <EntryDetails entry={e} diagnoses={diagnoses!} />
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
