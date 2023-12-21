import {memo, useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import '../index.sass';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {User} from 'types/user-types';
import {Sex} from 'types/selection-types';
import {selectUser} from 'store/userSelector';

const Step3Impl = () => {
  const currentUser = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm<User>({
    defaultValues: {
      sex: currentUser.sex,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = useCallback(() => {
    const formData = getValues();

    dispatch(setUser(formData));
    navigate('/step3');
  }, [dispatch, navigate]);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='text_field'
        type='number'
        {...register('sex', {
          required: 'Поле обязательно',
        })}
      />
      {errors?.age && <span className='error_span'>{errors.age.message || 'Error'}</span>}
      <Controller
        name='sex'
        control={control}
        render={({field}) => (
          <select {...field}>
            {Object.values(Sex).map(sex => (
              <option key={sex} value={sex}>
                {sex}
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

export const Step3 = memo(Step3Impl);
