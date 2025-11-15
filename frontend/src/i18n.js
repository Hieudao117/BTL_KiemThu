import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';


import en from './locales/en.json';

import vi from './locales/vi.json'
i18n
  .use(LanguageDetector) // Detects the user's language
  .use(Backend) // Enables backend support
  .use(initReactI18next) // Initializes react-i18next
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },
    debug :true,
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      }
    
    },
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    react: {
      useSuspense: false, // Disable suspense (optional)
    },
  });
   


export default i18n;
