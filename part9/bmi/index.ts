import express from 'express';

import calculateBmi from './bmiCalculator';
import { calculateExercises, ExercisesArgs } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const bmi = calculateBmi(height, weight);
  return res.status(200).json({
    height,
    weight,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesArgs;

  if (!target || !daily_exercises) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  if (!daily_exercises.every((num) => !isNaN(num)) || isNaN(target)) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const result = calculateExercises(target, daily_exercises);
  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
