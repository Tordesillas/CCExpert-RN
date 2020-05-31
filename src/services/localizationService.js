import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from '../locales/en.json';
import translationFR from '../locales/fr.json';

const LANGUAGE = 'language';
const DEFAULT_LANGUAGE = 'en';

export default class LocalizationService {
    static className = 'LocalizationService';
    language: string = undefined;
    resources = {
        en: {
            translation: translationEN
        },
        fr: {
            translation: translationFR
        }
    };

    async setLanguage(language: string) {
        if (i18next.isInitialized && language !== this.language) {
            await i18next.changeLanguage(language);
        }
        if (!i18next.isInitialized) {
            await i18next
                .use(initReactI18next)
                .init({
                    resources: this.resources,
                    lng: language,
                    keySeparator: '.',
                    interpolation: {
                        escapeValue: false
                    }
                });
        }

        if (!this.language || language !== this.language) {
            this.language = language;
            await AsyncStorage.setItem(LANGUAGE, language);
        }
    }

    async getLanguageSafe() {
        if (this.language === undefined) {
            this.language = await AsyncStorage.getItem(LANGUAGE);
        }
        if (!this.language) {
            const bestLanguage = RNLocalize.findBestAvailableLanguage(Object.keys(this.resources));
            this.language = bestLanguage ? bestLanguage.languageTag : DEFAULT_LANGUAGE;
        }
        return this.language;
    }

    getLanguage() {
        return this.language || DEFAULT_LANGUAGE;
    }
}
