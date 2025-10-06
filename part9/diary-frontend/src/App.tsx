import { useState, useEffect } from 'react';
import { getAllDiaries } from './services/diaryServices';

import { type NonSensitiveDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
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
