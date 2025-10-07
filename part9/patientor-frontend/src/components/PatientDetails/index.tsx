import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import patientService from '../../services/patients';

import { Patient } from '../../types';

import EntryDetails from './EntryDetails';

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();

  const match = useMatch('/patients/:id');
  const id = match?.params.id as string;

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getByID(id);
      setPatient(patient);
    };

    fetchPatient(id);
  }, [id]);

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

  const style = {
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
      <h3>entries</h3>
      {patient?.entries.map((e) => (
        <div key={e.id} style={style}>
          <EntryDetails entry={e} />
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
