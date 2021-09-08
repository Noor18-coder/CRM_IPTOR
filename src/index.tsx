import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import './i18n';

import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import App from './App';

import { persistor, store } from './store';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // Language to use
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
