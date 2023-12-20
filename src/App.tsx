import {Step1} from 'pages/Step1';
import {Step2} from 'pages/Step2';
import {memo} from 'react';
import {Route, Routes} from 'react-router';

const AppImpl = () => {
  return (
    <Routes>
      <Route path='/' element={<Step1 />} />
      <Route path='/step2' element={<Step2 />} />
      {/* <Route path='/' element={<Step1 />} /> */}
      {/* <Route path='/finish' element={<Finish />} /> */}
    </Routes>
  );
};

export const App = memo(AppImpl);
