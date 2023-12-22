import {memo} from 'react';
import {File} from 'types/selection-types';

interface Iprops {
  getInputProps: () => void;
  getRootProps: () => void;
  files: File[];
}

const DropZoneElImpl = ({getRootProps, getInputProps, files}: Iprops) => {
  return (
    <>
      <div {...getRootProps()} className='dropzone'>
        <input {...getInputProps()} />
        <p>Перетащите сюда файлы или кликните, чтобы выбрать файлы</p>
      </div>

      <ul>
        {files &&
          files.map((file: File, index: number) => <li key={index}>{file.name}</li>)}
      </ul>
    </>
  );
};

export const DropZoneEl = memo(DropZoneElImpl);
