import React from 'react';
import {memo, useCallback} from 'react';
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {User} from 'types/user-types';
import {File, Gender} from 'types/selection-types';
import {selectUser} from 'store/userSelector';
import {useDropzone} from 'react-dropzone';
import {setUser} from 'store/userSlice';
import {DropZoneEl} from 'components/DropZoneEl';

const Step3Impl = () => {
  const currentUser = useSelector(selectUser);
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: {isValid},
  } = useForm<User>({
    defaultValues: {
      gender: currentUser.gender || Gender.male,
      files: currentUser.files,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const files = getValues('files');

  const {getRootProps, getInputProps} = useDropzone({
    accept: '.png,.jpg,.gif',
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      setValue(
        'files',
        acceptedFiles.map(file => ({
          name: file.name,
          lastModified: file.lastModified,
          size: file.size,
          path: file.path,
        })),
      );
    },
  });

  const onSubmit: SubmitHandler<User> = useCallback(() => {
    const formData = getValues();
    dispatch(setUser(formData, files));
    navigate('/finish');
  }, [dispatch, navigate, getValues, files]);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <DropZoneEl
        files={files}
        getInputProps={getInputProps}
        getRootProps={getRootProps}
      />
      <label className='label'>Ваш пол</label>
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
