import { useState, useEffect } from 'react';
import { getAllDiaries } from './services/diaryServices';

import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

import { type NonSensitiveDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      <DiaryForm diaries={diaries} setDiaries={setDiaries} setNotification={setNotification} />
      <h2>Diary entries</h2>
      <ul>
        {diaries.map((note) => (
          <li key={note.id}>
            <strong>{note.date}</strong>
            <p>visibility: {note.visibility}</p>
            <p>weather: {note.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
