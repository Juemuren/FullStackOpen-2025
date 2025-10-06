import { type PartProps } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = (props: PartProps) => {
  const part = props.part;
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
        </>
      );
    case 'background':
      return (
        <>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );
    case 'group':
      return (
        <>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case 'special':
      return (
        <>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          <p>required skils: {part.requirements.join(', ')}</p>
        </>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
