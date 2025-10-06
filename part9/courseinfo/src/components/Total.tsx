import { type TotalProps } from '../types';

const Total = (props: TotalProps) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  );
};

export default Total;
