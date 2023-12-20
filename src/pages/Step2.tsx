import {memo, useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import '../index.sass';
import {useDispatch} from 'react-redux';
import {Navigate} from 'react-router';
import {FavoritColor, User, updateUser} from 'store/userSlice';

type TupeStep2 = {
  age: number;
  favoritColor: FavoritColor;
};

const Step2Impl = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm<TupeStep2>({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();

  const handleRegister = useCallback(
    ({age, favoritColor}) => {
      const updateCurrentUser: User = {
        age: age,
        favoritColor: favoritColor,
      };
      dispatch(updateUser(updateCurrentUser));
    },
    [dispatch],
  );

  const onSubmit: SubmitHandler<TupeStep2> = data => {
    handleRegister(data), (<Navigate to='/step2' />);
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='text_field'
        {...register('age', {
          required: 'Поле обязательно',
          minLength: {
            value: 1,
            message: 'Не менее 5 символов',
          },
        })}
      />
      {errors?.age && <span className='error_span'>{errors.age.message || 'Error'}</span>}
      <Controller
        name='favoriteColor'
        control={control}
        render={({field}) => (
          <select {...field}>
            {Object.values(FavoritColor).map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        )}
      />
      <button type='submit' disabled={!isValid} className='form_btn'>
        Go Next
      </button>
    </form>
  );
};

export const Step2 = memo(Step2Impl);
