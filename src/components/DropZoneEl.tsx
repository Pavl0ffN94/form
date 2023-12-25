import {memo} from 'react';
import {File} from 'types/selection-types';
import '../index.sass';

interface Iprops {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  files: File[];
}

const DropZoneElImpl = ({getRootProps, getInputProps, files}: Iprops) => {
  console.log(files);

  return (
    <div className='dropzone_container'>
      <div className='dropzone_area' {...getRootProps()}>
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <p>Перетащите сюда фаилы</p>
        ) : (
          <p>Ваш фаил: {files[0].name}</p>
        )}
      </div>
    </div>
  );
};

export const DropZoneEl = memo(DropZoneElImpl);
