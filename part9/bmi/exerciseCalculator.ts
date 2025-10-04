export interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, times: number[]): ExercisesResult => {
  const periodLength = times.length;
  let trainingDays = 0;
  let count = 0;

  for (let i = 0; i < periodLength; i++) {
    if (times[i] > 0) {
      trainingDays += 1;
      count += times[i];
    }
  }
  const average = count / periodLength;

  let success: boolean;
  if (average > target) {
    success = true;
  } else {
    success = false;
  }

  let rating: number;
  let ratingDescription: string;
  if (average < 1) {
    rating = 1;
    ratingDescription = 'too bad';
  } else if (average < 2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'very well';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export interface ExercisesArgs {
  target: number;
  daily_exercises: number[];
}

const parseArguments = (args: string[]): ExercisesArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numbers = args.slice(2).map(Number);

  if (numbers.every((num) => !isNaN(num))) {
    return {
      target: numbers[0],
      daily_exercises: numbers.slice(1),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  if (require.main === module) {
    const { target, daily_exercises } = parseArguments(process.argv);
    console.log(calculateExercises(target, daily_exercises));
  }
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
