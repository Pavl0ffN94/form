import React, {memo} from 'react';
import {TextField} from './TextField';
import './styleComponents.sass';
import {useForm} from 'react-hook-form';

export type FormStep1 = {
  firstName: string;
  lastName?: string;
};

const FormSubmitImpl = succsesSubmit => {
  const {register, handleSubmit} = useForm<FormStep1>();

  return (
    <form className='form' onSubmit={handleSubmit(succsesSubmit)}>
      <TextField
        {...register('firstName', {
          required: 'Поле обязательно',
          minLength: {
            value: 5,
            message: 'Не менее 5 символов',
          },
        })}
      />
      <button type='submit' className='form_btn'>
        Go In
      </button>
    </form>
  );
};

export const FormSubmit = memo(FormSubmitImpl);
