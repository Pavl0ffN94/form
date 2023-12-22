import {memo, useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import '../index.sass';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {setUser} from 'store/userSlice';
import {FavoritColor} from 'types/selection-types';
import {User} from 'types/user-types';
import {selectUser} from 'store/userSelector';

const Step2Impl = () => {
  const currentUser = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: {errors, isValid},
  } = useForm<User>({
    mode: 'onBlur',
    defaultValues: {
      age: currentUser.age,
      favoritColor: currentUser.favoritColor,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = useCallback(() => {
    const formData = getValues();
    console.log(formData);

    dispatch(setUser(formData));
    navigate('/step3');
  }, [dispatch, navigate, getValues]);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='text_field'
        type='number'
        placeholder='Ваш возраст'
        {...register('age', {
          required: 'Поле обязательно',
        })}
      />
      {errors?.age && <span className='error_span'>{errors.age.message || 'Error'}</span>}
      <label className='label'>Ваш любимый цвет</label>
      <Controller
        name='favoritColor'
        control={control}
        render={({field}) => (
          <select className='select' {...field}>
            {Object.values(FavoritColor).map(color => (
              <option className='select_option' key={color} value={color}>
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
