import {memo, useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import '../index.sass';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {User} from 'types/user-types';
import {Gender} from 'types/selection-types';
import {selectUser} from 'store/userSelector';
import {DropZoneEl} from 'components/DropZoneEl';

const Step3Impl = () => {
  const currentUser = useSelector(selectUser);
  const {
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<User>({
    defaultValues: {
      gender: currentUser.gender,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = useCallback(() => {
    const formData = getValues();
    console.log(formData);

    dispatch(setUser(formData));
    navigate('/step3');
  }, [dispatch, navigate]);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input type='file'>
        <DropZoneEl control={control} name='files' />
      </input>
      <Controller
        name='gender'
        control={control}
        render={({field}) => (
          <select required={true} className='select' {...field}>
            {Object.values(Gender).map(gender => (
              <option className='select_option' key={gender} value={gender}>
                {gender}
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
