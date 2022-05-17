import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import i18next from 'i18next';
import numbro from 'numbro';
import numbroLanguages from 'numbro/dist/languages.min.js';
import {initReactI18next} from 'react-i18next';
import translationEN from '../locales/en.json';
import translationFR from '../locales/fr.json';

numbro.registerLanguage(numbroLanguages['fr-FR']);

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
        if (language === "fr" && numbro.language() !== "fr-FR") {
            numbro.setLanguage('fr-FR');
        } else if (language !== "fr" && numbro.language() !== "en-US") {
            numbro.setLanguage('en-US');
        }

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
                    },
                    compatibilityJSON: 'v3'
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

    formatNumber(number: number) : string {
        return numbro(number).format({thousandSeparated: true});
    }
}
