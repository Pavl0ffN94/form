import {memo} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectUser} from 'store/userSelector';

const FinishImpl = () => {
  const currentUser = useSelector(selectUser);
  const entries = Object.entries(currentUser).filter(
    entry => entry[0] !== 'files' && 'id',
  );
  console.log(entries);

  const files = currentUser.files;

  return (
    <>
      <table className='table_wrpapper'>
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

        {files && (
          <tfoot>
            <tr>
              <th>Files </th>
              <td align='right'>{files[0].name}</td>
            </tr>
          </tfoot>
        )}
      </table>
      <Link to='/'>Start over</Link>
    </>
  );
};

export const Finish = memo(FinishImpl);
