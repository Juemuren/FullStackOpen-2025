import { InputLabel, Select, FormControl, OutlinedInput, MenuItem, SelectChangeEvent } from '@mui/material';
import { Diagnosis } from '../../types';

interface Props {
  diagnoses: Diagnosis[];
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiagnosisCodesSelector = ({ diagnoses, diagnosisCodes, setDiagnosisCodes }: Props) => {
  const handleDiagnosis = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <InputLabel id="diagnosis-codes">Diagnosis Codes</InputLabel>
      <Select
        labelId="diagnosis-codes"
        multiple
        value={diagnosisCodes}
        onChange={handleDiagnosis}
        input={<OutlinedInput label="Diagnosis Codes" />}
        MenuProps={MenuProps}
      >
        {diagnoses.map((d) => (
          <MenuItem key={d.code} value={d.code}>
            {d.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodesSelector;
