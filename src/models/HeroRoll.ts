import {LocalizationService, Registry} from '../services';
import {Images} from '../utils';

export default class HeroRoll {
    nameFR: string;
    nameEN: string;
    nameDE: string;
    nameES: string;
    nameRU: string;
    proba: number;
    occurrences: number;

    localizationService: LocalizationService;

    constructor(heroRoll: any) {
        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.nameFR = heroRoll.name_fr;
        this.nameEN = heroRoll.name_en;
        this.nameDE = heroRoll.name_de;
        this.nameES = heroRoll.name_es;
        this.nameRU = heroRoll.name_ru;

        this.proba = heroRoll.proba;
        this.occurrences = 0;
    }

    getName(): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.nameFR;
            default:
                return this.nameEN;
        }
    }

    getPicture(appearance?: number): number {
        return Images[`${this.nameEN}${appearance || ''}`.toLowerCase().trim().replace(/[ -]/g, '_') as keyof typeof Images];
    }

    getOccurrencesAndIncr() {
        this.occurrences++;
        return this.occurrences;
    }

    resetOccurrences() {
        this.occurrences = 0;
    }
}