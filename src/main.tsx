import ReactDOM from 'react-dom/client';
import './index.sass';
import {Provider} from 'react-redux';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import store from 'store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
