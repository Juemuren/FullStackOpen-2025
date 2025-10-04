import express from 'express';

import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
