import { useState } from 'react';

import { createDiary } from '../services/diaryServices';

import { isAxiosError } from 'axios';
import { type NonSensitiveDiaryEntry, type NewDiaryEntry } from '../types';

interface DiaryFormProps {
  diaries: NonSensitiveDiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const DiaryForm = ({ diaries, setDiaries, setNotification }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    } as NewDiaryEntry;

    createDiary(newEntry)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          setNotification(error.response?.data);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          data: <input value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
        </div>
        <div>
          weather: <input value={weather} onChange={(event) => setWeather(event.target.value)} />
        </div>
        <div>
          comment: <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
