import React, {memo} from 'react';
import './styleComponents.sass';

const TextFieldImpl = React.createRef(({error, name}, ref) => {
  console.log('render');

  return (
    <React.Fragment ref={ref}>
      <label>{name} </label>
      <input className='text_field' />
      {error && <span>{error.message}</span>}
    </React.Fragment>
  );
});

export const TextField = memo(TextFieldImpl);
