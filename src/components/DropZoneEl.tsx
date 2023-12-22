import {memo} from 'react';
import {Controller} from 'react-hook-form';
import {List} from './List';
import Dropzone from 'react-dropzone';
interface Iprops {
  onChange: () => void;
  onBlur: () => void;
  value: string[];
}
const DropZoneElImpl = ({control, name}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({onChange, onBlur, value}: Iprops) => {
        <>
          <Dropzone onDrop={onChange}>
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} name={name} onBlur={onBlur} />
                <p>Drag'n drop files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          <List>
            {value?.map((file, index) => {
              <span key={index}>{file}</span>;
            })}
          </List>
        </>;
      }}
    />
  );
};

export const DropZoneEl = memo(DropZoneElImpl);
