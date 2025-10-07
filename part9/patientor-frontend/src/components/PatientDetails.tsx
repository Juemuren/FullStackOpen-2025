import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnoses';

import { Patient, Diagnosis } from '../types';

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

  return (
    <div>
      <h2>
        <span>{patient?.name} </span>
        {genderIcon(patient?.gender)}
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      {patient?.entries.map((e) => (
        <div key={e.id}>
          <span>{e.date}</span>
          <i> {e.description}</i>
          <ul>
            {e.diagnosisCodes?.map((d) => (
              <li key={d}>
                <span>{d} </span>
                <span>{diagnoses?.find((dia) => dia.code === d)?.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
