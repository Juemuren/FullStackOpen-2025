import { type TotalProps } from '../types';

const Total = (props: TotalProps) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <>
      <h3>Number of exercises {totalExercises}</h3>
    </>
  );
};

export default Total;
