import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  // i18next-http-backend
  // loads translations from your server
  .use(Backend)

  // detect user language
  .use(LanguageDetector)

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)

  // init i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: true,

    keySeparator: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
