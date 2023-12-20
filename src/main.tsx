import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.sass';
import {Provider} from 'react-redux';
import {App} from './App';
import {persistor} from './store';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import store from 'store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
