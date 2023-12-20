import {memo, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import '../index.sass';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {nanoid} from '@reduxjs/toolkit';
import {addUser} from 'store/userSlice';

type TupeStep1 = {
  firstName: string;
  lastName: string;
};

const Step1Impl = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<TupeStep1>({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = useCallback(
    ({firstName, lastname}) => {
      const newUser: User = {
        id: nanoid(),
        firstName: firstName,
        lastname: lastname,
      };
      dispatch(addUser(newUser));
    },
    [dispatch],
  );

  const onSubmit: SubmitHandler<TupeStep1> = data => {
    console.log(data);

    handleRegister(data), navigate('/step2');
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='text_field'
        {...register('firstName', {
          required: 'Поле обязательно',
          minLength: {
            value: 2,
            message: 'Не менее 5 символов',
          },
        })}
      />
      {errors?.firstName && (
        <span className='error_span'>{errors.firstName.message || 'Error'}</span>
      )}
      <input
        className='text_field'
        {...register('lastName', {
          required: 'Поле обязательно',
          minLength: {
            value: 3,
            message: 'Не менее 5 символов',
          },
        })}
      />
      {errors?.lastName && (
        <span className='error_span'>{errors.lastName.message || 'Error'}</span>
      )}
      <button type='submit' disabled={!isValid} className='form_btn'>
        Go Next
      </button>
    </form>
  );
};

export const Step1 = memo(Step1Impl);
