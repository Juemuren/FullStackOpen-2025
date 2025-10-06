import { type ContentProps } from '../types';

import Part from './Part';

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </>
  );
};

export default Content;
