import {memo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectUser} from 'store/userSelector';

const FinishImpl = () => {
  const currentUser = useSelector(selectUser);
  const entries = Object.entries(currentUser).filter(entry => entry[0] !== 'files');
  const files = currentUser.files;

  const onSubmit = useCallback(async () => {
    const formData = new FormData();
    if (Array.isArray(currentUser.files) && currentUser.files.length > 0) {
      currentUser.files.forEach(file => {
        if (file instanceof File) {
          formData.append('files', file, file.name);
        }
      });
    }

    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    });

    try {
      const response = await fetch('http://localhost:4000', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Success!');
      } else {
        alert('Error!');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    }
  }, [currentUser.files, entries]);

  return (
    <div className='table_wrpapper'>
      <table>
        <thead>
          <tr>
            <th className='table_header'>Field</th>
            <th className='table_header' align='right'>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr className='table_field' key={entry[0]}>
              <td className='table_label-field'>{entry[0]}</td>
              <td align='right'>{entry[1]}</td>
            </tr>
          ))}
        </tbody>

        {files.length !== 0 && (
          <tfoot className='table_footer'>
            <tr>
              <th className='table_header'>📦Files </th>
              <td className='table_field' align='right'>
                {files[0].name}
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      <div className='table_button-group'>
        <Link className='table_btn-to_start' to='/'>
          Start over
        </Link>
        <button onClick={onSubmit} className='table_btn-submit'>
          Submit
        </button>
      </div>
    </div>
  );
};

export const Finish = memo(FinishImpl);
