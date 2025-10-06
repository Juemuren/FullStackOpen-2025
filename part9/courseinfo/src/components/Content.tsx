import { type ContentProps, type PartProps } from '../types';

const Part = (props: PartProps) => {
  return (
    <>
      <p>
        {props.name} {props.exerciseCount}
      </p>
    </>
  );
};

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((p) => (
        <Part key={p.name} name={p.name} exerciseCount={p.exerciseCount} />
      ))}
    </>
  );
};

export default Content;
