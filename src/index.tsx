/* eslint-disable import/no-mutable-exports */
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';

import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import './i18n';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import reportWebVitals from './reportWebVitals';
import App from './App';

let keycloak: any;

document.body.tabIndex = 0;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const auth = sessionStorage.getItem('api-authorization');
  if (auth && auth !== '') {
    config.headers.Authorization = `Bearer ${auth}`;
  } else {
    config.headers.Authorization = keycloak.token;
  }
  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.token) sessionStorage.setItem('api-authorization', response.data.token);
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
  }
);

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // Language to use
});

fetch('./authconfig.json').then(async (resp) => {
  const config = await resp.json();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  keycloak = new Keycloak(config);

  ReactDOM.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router>
                <App />
              </Router>
            </PersistGate>
          </Provider>
        </ReactKeycloakProvider>
      </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

export { keycloak };

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
