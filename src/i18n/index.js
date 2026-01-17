import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import tr from './locales/tr.json'

const savedLanguage = typeof window !== 'undefined'
    ? localStorage.getItem('cleantify-language')
    : null

const browserLanguage = typeof navigator !== 'undefined'
    ? navigator.language.split('-')[0]
    : 'en'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            tr: { translation: tr }
        },
        lng: savedLanguage || (browserLanguage === 'tr' ? 'tr' : 'en'),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('cleantify-language', lang)
}

export default i18n
