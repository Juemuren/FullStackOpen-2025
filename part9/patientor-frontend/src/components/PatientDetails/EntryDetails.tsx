import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';

import { Entry, Diagnosis, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  const healthIcon = (healthCheckRating: number) => {
    switch (healthCheckRating) {
      case 0:
        return <FavoriteIcon color="success" />;
      case 1:
        return <FavoriteIcon color="warning" />;
      case 2:
        return <FavoriteIcon color="error" />;
      case 3:
        return <FavoriteIcon color="disabled" />;
    }
  };

  return (
    <div>
      <p>
        <span>{entry.date} </span>
        <MedicalServicesIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>
            <span>{d} </span>
            <span>{diagnoses?.find((dia) => dia.code === d)?.name}</span>
          </li>
        ))}
      </ul>
      {healthIcon(entry.healthCheckRating)}
      <p>diagnosis by {entry.specialist}</p>
    </div>
  );
};

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div>
      <p>
        <span>{entry.date}</span>
        <LocalHospitalIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <div>
        <p>discharge</p>
        <p>date: {entry.discharge.date}</p>
        <p>criteria: {entry.discharge.criteria}</p>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>
            <span>{d} </span>
            <span>{diagnoses?.find((dia) => dia.code === d)?.name}</span>
          </li>
        ))}
      </ul>
      <p>diagnosis by {entry.specialist}</p>
    </div>
  );
};

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: OccupationalHealthcareEntryProps) => {
  return (
    <div>
      <p>
        <span>{entry.date} </span>
        <WorkIcon />
        <i> {entry.employerName}</i>
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.sickLeave !== undefined && (
        <div>
          <p>sickleave</p>
          <p>start: {entry.sickLeave?.startDate}</p>
          <p>end: {entry.sickLeave?.endDate}</p>
        </div>
      )}
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>
            <span>{d} </span>
            <span>{diagnoses?.find((dia) => dia.code === d)?.name}</span>
          </li>
        ))}
      </ul>
      <p>diagnosis by {entry.specialist}</p>
    </div>
  );
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses!} />;
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses!} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses!} />;
  }
};

export default EntryDetails;
