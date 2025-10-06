import { useState } from 'react';

import { createDiary } from '../services/diaryServices';

import { isAxiosError } from 'axios';
import { type NonSensitiveDiaryEntry, type NewDiaryEntry, Visibility, Weather } from '../types';

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
          date: <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility:
          {Object.values(Visibility).map((v) => (
            <span key={v}>
              <input
                type="radio"
                id={v}
                name="visibility"
                value={v}
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label>{v}</label>
            </span>
          ))}
        </div>
        <div>
          weather:
          {Object.values(Weather).map((w) => (
            <span key={w}>
              <input
                type="radio"
                id={w}
                name="weather"
                value={w}
                onChange={(event) => setWeather(event.target.value)}
              />
              <label>{w}</label>
            </span>
          ))}
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
