import {memo, useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import '../index.sass';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {nanoid} from '@reduxjs/toolkit';
import {setUser} from 'store/userSlice';
import {User} from 'types/user-types';
import {selectUser} from 'store/userSelector';

const Step1Impl = () => {
  const currentUser = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm<User>({
    mode: 'onBlur',
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = useCallback(() => {
    const formData = getValues();
    const newUserData = {...formData, id: nanoid()};
    dispatch(setUser(newUserData));
    navigate('/step2');
  }, [dispatch, getValues, navigate]);

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
