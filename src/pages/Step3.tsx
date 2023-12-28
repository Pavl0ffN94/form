import {memo, useCallback} from 'react';
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {User} from 'types/user-types';
import {Gender} from 'types/selection-types';
import {selectUser} from 'store/userSelector';
import {FileWithPath, useDropzone} from 'react-dropzone';
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
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
    multiple: false,
    onDrop: (acceptedFiles: FileWithPath[]) => {
      setValue(
        'files',
        acceptedFiles.map((file: FileWithPath) => ({
          name: file.name,
          lastModified: file.lastModified,
          size: file.size,
          path: file.path || '',
        })),
      );
    },
  });

  const onSubmit: SubmitHandler<User> = useCallback(() => {
    const formData = getValues();
    dispatch(setUser({...formData, files}));
    navigate('/finish');
  }, [getValues, dispatch, files, navigate]);

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
