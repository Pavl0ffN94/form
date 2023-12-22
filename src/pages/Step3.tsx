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

const Step3Impl = () => {
  const currentUser = useSelector(selectUser);
  const {
    handleSubmit,
    control,
    setValue, // Добавлено значение setValue
    getValues, // Добавлено значение getValues
    formState: {isValid},
  } = useForm<User>({
    defaultValues: {
      gender: currentUser.gender,
    },
  });

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: File[]) => {
      // Используйте setValue для установки значения поля 'files'
      setValue('files', acceptedFiles);
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

  // Получите значение поля 'files' из хука формы
  const files = getValues('files');

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div {...getRootProps()} className='dropzone'>
        <input {...getInputProps()} />
        <p>Перетащите сюда файлы или кликните, чтобы выбрать файлы</p>
      </div>

      {/* Поле для просмотра выбранных файлов */}
      <ul>
        {files &&
          files.map((file: File, index: number) => <li key={index}>{file.name}</li>)}
      </ul>
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
